export interface taskModel {
  id: string;
  name: string;
  description: string;
}

export interface Column {
  column: {
    name: string;
    tasks: taskModel[];
  };
}
