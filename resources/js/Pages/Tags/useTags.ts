// resources/js/composables/useTags.ts
import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useTags() {
    const tags = ref([])
    const isVisible = ref(false)
    const selectedItemId = ref<number | null>(null)

    onMounted(async () => {
        try {
            const response = await axios.get('/api/tags')
            tags.value = response.data
        } catch (error) {
            console.error('Erro ao buscar as tags:', error)
        }
    })

    const actionsModal = {
        fechar() {
            isVisible.value = false
        },
        confirmar() {
            if (selectedItemId.value !== null) {
                // Lógica para confirmar a exclusão
                console.log('Excluir item com ID:', selectedItemId.value)
                // Após a exclusão, redefina selectedItemId
                selectedItemId.value = null
            }
            isVisible.value = false // Fechar o modal após a confirmação
        },
    }

    const actions = {
        editItem(item: any) {
            console.log('Editar tag:', item)
        },
        deleteItem(itemId: number) {
            console.log('Apagar tag com ID:', itemId)
            selectedItemId.value = itemId
            isVisible.value = true
        },
    }

    return {
        tags,
        isVisible,
        selectedItemId,
        actionsModal,
        actions,
    }
}
