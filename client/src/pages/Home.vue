<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Task, TaskStatusEnum } from "../types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";

const tasks = ref<Task[]>([]);
const filter = ref<TaskStatusEnum | undefined>(undefined);

async function loadTasks() {
  tasks.value = await getTasks(filter.value);
}

async function handleCreate(data: {
  title: string;
  description: string;
  status: TaskStatusEnum;
}) {
  await createTask(data);
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
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Tareas</h1>

    <div class="mb-4">
      <button
        @click="
          filter = undefined;
          loadTasks();
        "
        class="px-3 py-1 border rounded"
      >
        Todas
      </button>
      <button
        @click="
          filter = TaskStatusEnum.COMPLETED;
          loadTasks();
        "
        class="px-3 py-1 border rounded"
      >
        Completadas
      </button>
      <button
        @click="
          filter = TaskStatusEnum.PENDING;
          loadTasks();
        "
        class="px-3 py-1 border rounded"
      >
        Pendientes
      </button>
    </div>

    <TaskForm @submit="handleCreate" />
    <TaskList
      :tasks="tasks"
      :onToggle="handleToggle"
      :onDelete="handleDelete"
    />
  </div>
</template>
