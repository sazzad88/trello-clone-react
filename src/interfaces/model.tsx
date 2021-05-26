export interface taskModel {
  id: string;
  name: string;
  description: string;
}

export interface BaseColumn {
  name: string;
  tasks: taskModel[];
}

export interface Column {
  column: BaseColumn;
  colIndex: Number;
}
