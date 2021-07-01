export interface Comment {
  content: string;
  id: string;
  createdAt: string;
}

export type AllowedActivity = "Checklist";

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface CheckList {
  id: string;
  title: string;
  activityType: AllowedActivity;
  content: ChecklistItem[];
}

export interface taskModel {
  name: string;
  slug: string;
  description: string;
  activity: CheckList[];
  comments: Comment[];
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
