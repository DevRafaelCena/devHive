import { reactive } from 'vue'

interface ToastItem {
    message: string
    type: string
}

const toastStore = reactive({
    items: [] as ToastItem[],
    add(item: ToastItem) {
        this.items.push(item)
        setTimeout(() => {
            this.items.shift() // Remove o primeiro toast após 5 segundos
        }, 5000)
    },
    remove(index: number) {
        this.items.splice(index, 1)
    },
})

export default toastStore
