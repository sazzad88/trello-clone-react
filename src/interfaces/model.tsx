export interface taskModel {
  name: string;
  slug: string;
  description: string;
}

export interface BaseColumn {
  name: string;
  id: string;
  tasks: taskModel[];
}

export interface Column {
  column: BaseColumn;
  colIndex: number;
  move_column: (fromColumnIndex: number, toColumnIndex: number) => void;
  move_task: (
    fromTaskIndex: number,
    toTaskIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => void;
}
