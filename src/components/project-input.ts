namespace App {
    //project input class
    export class ProjectInput extends Component<HTMLDivElement, HTMLInputElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLTextAreaElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super("project-input", "app", true, "user-input")
            this.titleInputElement = this.element!.querySelector("#title")!;
            this.descriptionInputElement = this.element!.querySelector("#description")!;
            this.peopleInputElement = this.element!.querySelector("#people")!;
            this.configure();
        }

        private gatherInput(): [string, string, number] | void {
            const title = this.titleInputElement.value;
            const description = this.descriptionInputElement.value;
            const people = this.peopleInputElement.value;

            if (
                !validate({ value: title, required: true, minLenght: 1 }) ||
                !validate({ value: description, required: true, minLenght: 1 }) ||
                !validate({ value: people, required: true, min: 1, max: 5 })) {
                alert("Invalid Input");
                return;
            }
            else return [title, description, +people];
        }

        private clearInput() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }

        @AutoBind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                projectState.addProject(title, description, people);
                this.clearInput();
            }
        }

        configure() {
            this.element!.addEventListener("submit", this.submitHandler);
        }

        renderContent() {
        }
    }
}