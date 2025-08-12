<script setup lang="ts">
import { ref } from "vue";
import { TaskStatusEnum } from "../utils/enums/task_status.enum";

const emit = defineEmits<{
  (
    e: "submit",
    task: { title: string; description?: string; status: TaskStatusEnum }
  ): void;
}>();

const title = ref("");
const description = ref("");
const status = ref<TaskStatusEnum>(TaskStatusEnum.PENDING);

function handleSubmit() {
  emit("submit", {
    title: title.value.trim(),
    description: description.value.trim(),
    status: status.value,
  });
  title.value = "";
  description.value = "";
  status.value = TaskStatusEnum.PENDING;
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col gap-3"
  >
    <input
      v-model="title"
      placeholder="Título de la tarea"
      required
      class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <textarea
      v-model="description"
      placeholder="Descripción (opcional)"
      class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
      rows="2"
    ></textarea>

    <select
      v-model="status"
      class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option :value="TaskStatusEnum.PENDING">Pendiente</option>
      <option :value="TaskStatusEnum.COMPLETED">Completada</option>
    </select>

    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition-all"
    >
      ➕ Agregar Tarea
    </button>
  </form>
</template>
