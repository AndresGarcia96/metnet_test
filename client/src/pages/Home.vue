<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/task_services";
import { TaskStatusEnum } from "../utils/enums/task_status.enum";
import type { Task } from "../utils/interfaces/task.interface";
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";
import FilterBar from "../components/FilterBar.vue";

const tasks = ref<Task[]>([]);
const filter = ref<TaskStatusEnum | null>(null);

async function loadTasks() {
  tasks.value = await getTasks(filter.value || undefined);
}

async function handleCreate(task: {
  title: string;
  description?: string;
  status: TaskStatusEnum;
}) {
  await createTask(task);
  await loadTasks();
}

async function handleToggle(task: Task) {
  const newStatus =
    task.status === TaskStatusEnum.COMPLETED
      ? TaskStatusEnum.PENDING
      : TaskStatusEnum.COMPLETED;
  await updateTask(task.id, { status: newStatus });
  await loadTasks();
}

async function handleDelete(id: string) {
  await deleteTask(id);
  await loadTasks();
}

onMounted(loadTasks);
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
    <div class="bg-white shadow-lg rounded-xl w-full max-w-3xl">
      <div class="border-b px-6 py-4 flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-800">📌 Lista de Tareas</h1>
        <FilterBar
          :selected="filter"
          :onChange="
            (f: any) => {
              filter = f;
              loadTasks();
            }
          "
        />
      </div>

      <div class="px-6 py-4 bg-gray-50 border-b">
        <TaskForm @submit="handleCreate" />
      </div>

      <div class="p-6">
        <TaskList
          :tasks="tasks"
          :onToggle="handleToggle"
          :onDelete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>
