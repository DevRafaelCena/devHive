<template>
    <transition name="modal">
        <div v-if="isVisible" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>{{ isEditMode ? 'Editar Tag' : 'Criar Tag' }}</h3>
                    </div>
                    <div class="modal-body">
                        <label for="tagName">Nome:</label>
                        <input
                            id="tagName"
                            type="text"
                            v-model="tag.nome"
                            class="input"
                        />
                    </div>
                    <div class="modal-footer">
                        <button
                            @click="actions.fechar"
                            class="btn btn-secondary"
                        >
                            Cancelar
                        </button>
                        <button @click="handleSave" class="btn btn-primary">
                            {{ isEditMode ? 'Salvar' : 'Criar' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

interface TableActions {
    fechar: () => void
    salvar: (tag: any) => void
}

const props = defineProps<{
    isVisible: boolean
    actions: TableActions
    tagData: any
    isEditMode: boolean
}>()

const emits = defineEmits(['update:isVisible'])

const tag = ref({ id: null, nome: '' })

watch(
    () => props.tagData,
    (newVal) => {
        tag.value = { ...newVal }
    },
    { immediate: true },
)

const handleSave = () => {
    props.actions.salvar(tag.value)
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-wrapper {
    width: 400px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-header {
    padding: 16px;
    border-bottom: 1px solid #ccc;
    text-align: center;
}

.modal-body {
    padding: 16px;
}

.modal-footer {
    padding: 16px;
    display: flex;
    justify-content: center;
}

.btn {
    padding: 8px 16px;
    margin: 0 8px;
    cursor: pointer;
    border-radius: 4px;
}

.btn-secondary {
    background-color: #ccc;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.input {
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
