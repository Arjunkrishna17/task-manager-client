export interface taskDetails {
  title: string;
  description: string;
}

export interface taskAllInfo {
  task_id: string; // Custom task identifier (optional)
  title: string;
  description?: string;
  assigned_to?: {
    id: string;
    name: string; // Name of the assigned user
    avatar_url: string; // Avatar URL of the assigned user
  };
  status: string;
  user_id: string;
  due_date?: Date;
  priority?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface column {
  id: string;
  title: string;
  taskIds: string[];
}
