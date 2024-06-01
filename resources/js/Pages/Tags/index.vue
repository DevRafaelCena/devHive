<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import { Head } from '@inertiajs/vue3'
import Table from '@/Components/Table.vue'
import ModalExclusao from '@/Components/ModalExclusao.vue'
import { useTags } from '@/Pages/Tags/useTags'

const { tags, isVisible, selectedItemId, actionsModal, actions } = useTags()

const tagColumns = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome' },
]
</script>

<template>
    <Head title="Tags" />
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Tags
            </h2>
        </template>

        <ModalExclusao :isVisible="isVisible" :actions="actionsModal" />

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <h3 class="font-semibold text-lg mb-4">
                            Lista de Tags
                        </h3>
                        <Table
                            :columns="tagColumns"
                            :items="tags"
                            :actions="actions"
                        />
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
