<template>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th
                    v-for="column in columns"
                    :key="column.key"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    {{ column.label }}
                </th>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    Ações
                </th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in items" :key="item.id">
                <td
                    v-for="column in columns"
                    :key="column.key"
                    class="px-6 py-4 whitespace-nowrap"
                >
                    {{ item[column.key] }}
                </td>

                <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                        @click="actions.editItem(item)"
                        class="text-indigo-600 hover:text-indigo-900 flex items-center"
                    >
                        Editar
                    </button>
                    <button
                        @click="actions.deleteItem(item.id)"
                        class="text-red-600 hover:text-red-900 flex items-center"
                    >
                        Apagar
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface TableColumn {
    key: string
    label: string
}

interface TableItem {
    [key: string]: any
}

interface TableActions {
    editItem: (item: TableItem) => void
    deleteItem: (itemId: number) => void
}

const props = defineProps<{
    columns: TableColumn[]
    items: TableItem[]
    actions: TableActions
}>()
</script>
