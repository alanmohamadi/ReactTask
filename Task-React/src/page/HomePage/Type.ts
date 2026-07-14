export interface Task {
  id: string;
  title: string;
  status: 'active' | 'inactive';
}

export interface TaskState {
  tasks: Task[];
  searchQuery: string;
}