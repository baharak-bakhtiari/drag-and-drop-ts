//drag and drop interface

namespace App {
    export interface Draggable {
        DragStartHandler(event: DragEvent): void;
        DragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget {
        DragOverHandler(event: DragEvent): void;
        DropHandler(event: DragEvent): void;
        DragLeaveHandler(event: DragEvent): void;
    }
}