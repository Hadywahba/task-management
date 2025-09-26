export interface Task {
  description: string;
  due_date: string;
  id: number;
  priority: string;
  image_url: string;
  updated_at: string;
  title: string;
  completed: boolean;
  created_at: string;
  category_id: number;
}

export interface Tasks {
  Tasks: Task[];
}
