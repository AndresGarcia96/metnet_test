<script setup lang="ts">
import type { Task } from "../utils/interfaces/task.interface";
import { TaskStatusEnum } from "../utils/enums/task_status.enum";

defineProps<{
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}>();
</script>

<template>
  <div class="grid sm:grid-cols-2 gap-4">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-all"
    >
      <div>
        <h3
          class="text-lg font-semibold"
          :class="{
            'line-through text-gray-400':
              task.status === TaskStatusEnum.COMPLETED,
          }"
        >
          {{ task.title }}
        </h3>
        <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
      </div>

      <div class="flex gap-2 mt-4">
        <button
          @click="onToggle(task)"
          class="flex-1 px-3 py-1 text-sm rounded-lg text-white transition-all"
          :class="
            task.status === TaskStatusEnum.COMPLETED
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-green-500 hover:bg-green-600'
          "
        >
          {{
            task.status === TaskStatusEnum.COMPLETED ? "Reabrir" : "Completar"
          }}
        </button>

        <button
          @click="onDelete(task.id)"
          class="flex-1 px-3 py-1 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
