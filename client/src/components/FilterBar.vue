<script setup lang="ts">
import { TaskStatusEnum } from "../utils/enums/task_status.enum";

defineProps<{
  selected: TaskStatusEnum | null;
  onChange: (status: TaskStatusEnum | null) => void;
}>();
</script>

<template>
  <div class="flex gap-2">
    <button
      class="px-4 py-1 rounded-full text-sm border transition-all"
      :class="
        selected === null
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
      "
      @click="onChange(null)"
    >
      Todas
    </button>

    <button
      class="px-4 py-1 rounded-full text-sm border transition-all"
      :class="
        selected === TaskStatusEnum.PENDING
          ? 'bg-yellow-500 text-white border-yellow-500'
          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
      "
      @click="onChange(TaskStatusEnum.PENDING)"
    >
      Pendientes
    </button>

    <button
      class="px-4 py-1 rounded-full text-sm border transition-all"
      :class="
        selected === TaskStatusEnum.COMPLETED
          ? 'bg-green-500 text-white border-green-500'
          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
      "
      @click="onChange(TaskStatusEnum.COMPLETED)"
    >
      Completadas
    </button>
  </div>
</template>
