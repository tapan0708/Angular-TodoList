export interface todoList {
  todo: Todo[];
}

export interface Todo {
  id: number;
  title: string;
  desc: string;
  status: string;
}

export interface statusObj {
  id: number;
  status: string;
}
