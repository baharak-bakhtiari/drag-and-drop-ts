import {Project, ProjectStatus} from "../models/project";
    
    //listener class

    type Listener<T> = (items: T[]) => void;

    class State<T> {
        protected listeners: Listener<T>[] = [];

        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }

    //project state class, state management

    export class ProjectState extends State<Project>{
        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
            super();
        }

        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }

        addProject(title: string, description: string, people: number) {
            const newProject = new Project(Math.random().toString(),
                title,
                description,
                people,
                ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }

        switchStatus(projectId: string, prjNewStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== prjNewStatus) {
                project.status = prjNewStatus;
                this.updateListeners();
            }
        }

        private updateListeners() {
            for (const listener of this.listeners) {
                listener(this.projects.slice());
            }
        }
    }

    export const projectState = ProjectState.getInstance();

