<template>
    <transition name="modal">
        <div v-if="isVisible" class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Confirmação de Exclusão</h3>
                    </div>
                    <div class="modal-body">
                        <p>Tem certeza de que deseja excluir este item?</p>
                    </div>
                    <div class="modal-footer">
                        <button
                            @click="actions.fechar"
                            class="btn btn-secondary"
                        >
                            Cancelar
                        </button>
                        <button
                            @click="actions.confirmar(5)"
                            class="btn btn-danger"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface TableActions {
    fechar: () => void
    confirmar: (itemId: number) => void
}

const props = defineProps<{
    isVisible: boolean
    actions: TableActions
}>()

console.log(props)
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

.btn-danger {
    background-color: #ff4444;
    color: #fff;
}
</style>
