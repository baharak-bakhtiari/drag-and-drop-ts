namespace App {

    //project item class

    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
        private project: Project;

        get persons() {
            if (this.project.people === 1) {
                return "1 person is involved";
            }
            else return `${this.project.people} people are involved`;
        }

        constructor(hostId: string, project: Project) {
            super("single-project", hostId, false, project.id)
            this.project = project;

            this.configure();
            this.renderContent();
        }

        renderContent() {
            this.element!.querySelector("h2")!.innerText = this.project.title;
            this.element!.querySelector("h3")!.innerText = this.persons;
            this.element!.querySelector("p")!.innerText = this.project.description;
        }

        @AutoBind
        DragStartHandler(event: DragEvent) {
            event.dataTransfer!.setData("text/plain", this.project.id);
            event.dataTransfer!.effectAllowed = "move";
        }

        DragEndHandler(_: DragEvent) {
            console.log("DragEnd");
        }

        configure() {
            this.element!.addEventListener("dragstart", this.DragStartHandler);
            this.element!.addEventListener("dragend", this.DragEndHandler);

        }
    }
}