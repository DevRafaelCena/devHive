// resources/js/composables/useTags.ts
import { ref, onMounted } from 'vue'
import axios from 'axios'

export function useTags() {
    const tags = ref([])
    const isDeleteModalVisible = ref(false)
    const isEditModalVisible = ref(false)
    const selectedItemId = ref<number | null>(null)
    const isEditMode = ref(false)
    const tagData = ref({ id: null, nome: '' })

    const fetchTags = async () => {
        try {
            const response = await axios.get('/api/tags')
            tags.value = response.data
        } catch (error) {
            console.error('Erro ao buscar as tags:', error)
        }
    }

    onMounted(fetchTags)

    const actionsModalDelete = {
        fechar() {
            isDeleteModalVisible.value = false
        },
        async confirmar() {
            if (selectedItemId.value !== null) {
                // Lógica para confirmar a exclusão
                console.log('Excluir item com ID:', selectedItemId.value)

                // excluir o item no endpoint
                await axios.delete(`/api/tags/${selectedItemId.value}`)

                await fetchTags()

                selectedItemId.value = null
            }
            isDeleteModalVisible.value = false
        },
    }

    const actionsModalEdit = {
        fechar() {
            isEditModalVisible.value = false
        },
        async salvar(tag: any) {
            console.log(`TAG `, tag)
            if (isEditMode.value) {
                // Atualizar a tag existente
                await axios.put(`/api/tags/${tag.id}`, tag)
            } else {
                // Criar uma nova tag
                await axios.post('/api/tags', { nome: tag.nome })
            }
            await fetchTags() // Atualizar a lista de tags
            isEditModalVisible.value = false // Fechar o modal após a operação
        },
    }

    const actions = {
        editItem(item: any) {
            console.log('Editar tag:', item)
            tagData.value = { ...item }
            isEditMode.value = true
            isEditModalVisible.value = true
        },
        deleteItem(itemId: number) {
            console.log('Apagar tag com ID:', itemId)
            selectedItemId.value = itemId
            isDeleteModalVisible.value = true
        },
        createItem() {
            tagData.value = { id: null, nome: '' }
            isEditMode.value = false
            isEditModalVisible.value = true
        },
    }

    return {
        tags,
        isDeleteModalVisible,
        isEditModalVisible,
        selectedItemId,
        tagData,
        isEditMode,
        actionsModalDelete,
        actionsModalEdit,
        actions,
    }
}
