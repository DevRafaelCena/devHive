// resources/js/composables/useTags.ts
import { ref, onMounted } from 'vue'
import axios from 'axios'
import toast from '@/Stores/toast' // Importando a store de toast

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
            toast.add({ message: 'Erro ao buscar as tags.', type: 'error' }) // Adicionando toast de erro
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
                toast.add({
                    message: 'Tag excluída com sucesso.',
                    type: 'success',
                }) // Adicionando toast de sucesso

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
                await axios.put(`/api/tags/${tag.id}`, tag).catch((error) => {
                    console.error('Erro ao atualizar a tag:', error)
                    toast.add({
                        message: 'Erro ao excluir a tag.',
                        type: 'error',
                    }) // Adicionando toast de erro
                })
                toast.add({
                    message: 'Tag atualizada com sucesso.',
                    type: 'success',
                }) // Adicionando toast de sucesso
            } else {
                // Criar uma nova tag
                await axios.post('/api/tags', { nome: tag.nome })
                toast.add({
                    message: 'Tag criada com sucesso.',
                    type: 'success',
                }) // Adicionando toast de sucesso
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
