namespace App {

    //project list class

    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];

        constructor(private type: "active" | "finished") {
            super("project-list", "app", false, `${type}-projects`);
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }

        private renderProjects() {
            const listEl = document.getElementById(`${this.type}-list`)! as HTMLUListElement;
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
            }
        }

        @AutoBind
        DragOverHandler(event: DragEvent) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element!.querySelector("ul");
                listEl!.classList.add("droppable");
            }
        }

        @AutoBind
        DropHandler(event: DragEvent) {
            event.preventDefault();
            const prjId = event.dataTransfer!.getData("text/plain");
            projectState.switchStatus(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        }

        @AutoBind
        DragLeaveHandler(_: DragEvent) {
            const listEl = this.element!.querySelector("ul");
            listEl!.classList.remove("droppable");
        }

        configure() {
            this.element?.addEventListener("dragover", this.DragOverHandler);
            this.element?.addEventListener("dragleave", this.DragLeaveHandler);
            this.element?.addEventListener("drop", this.DropHandler);

            projectState.addListener((projects: Project[]) => {
                const relatedProjects = projects.filter(prj => {
                    if (this.type === "active") {
                        return (prj.status === ProjectStatus.Active);
                    }
                    return (prj.status === ProjectStatus.Finished);
                }
                )
                this.assignedProjects = relatedProjects;
                this.renderProjects();
            })
            this.renderContent();
        }

        renderContent() {
            const listId = `${this.type}-list`;
            if (this.element) {
                this.element.querySelector("ul")!.id = listId;
                this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`;
            }
        }
    }

}