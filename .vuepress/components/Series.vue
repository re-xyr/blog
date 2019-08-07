<template>
    <Pagination
        :prev="typeof prev === 'string' ? prev : undefined" 
        :next="typeof next === 'string' ? next : undefined" 
    />
</template>

<script>
import Pagination from '../theme/components/Layout/Pagination.vue'
export default {
    name: 'Series',
    props: ['prev', 'next'],
    components: { Pagination },
}
</script>
