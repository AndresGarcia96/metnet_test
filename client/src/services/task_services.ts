import type { Task } from "../utils/interfaces/task.interface";
import type { TaskStatusEnum } from "../utils/enums/task_status.enum";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getTasks(status?: TaskStatusEnum): Promise<Task[]> {
  const url = status ? `${apiUrl}/task?status=${status}` : `${apiUrl}/task`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createTask(
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
): Promise<Task> {
  const res = await fetch(`${apiUrl}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateTask(
  id: string,
  task: Partial<Task>
): Promise<Task> {
  const res = await fetch(`${apiUrl}/task/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${apiUrl}/task/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}
