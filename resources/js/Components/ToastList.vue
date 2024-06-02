<script setup lang="ts">
import { createInertiaApp, usePage } from '@inertiajs/vue3'
import { router } from '@inertiajs/vue3'

import Toast from './Toast.vue'
import { ref, onUnmounted } from 'vue'
import toast from '@/Stores/toast'

function remove(index: number) {
    toast.items.splice(index, 1)
}

const page = usePage()

const removeFinishEventListener = router.on('finish', () => {
    const pageProps = page.props.value as {
        toast?: { message: string; type: string }
    }
    if (pageProps?.toast) {
        const { message, type } = pageProps.toast
        toast.add({ message, type })
    }
})

onUnmounted(() => {
    removeFinishEventListener()
})
</script>
<template>
    <div class="fixed top-4 right-4 z-50 space-y-4 w-full max-w-xs">
        <Toast
            v-for="(item, index) in toast.items"
            :key="index"
            :message="item.message"
            :type="item.type"
            @remove="remove(index)"
        />
    </div>
</template>
