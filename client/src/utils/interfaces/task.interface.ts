import type { TaskStatusEnum } from "../enums/task_status.enum";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatusEnum;
  createdAt: string;
  updatedAt: string;
}
