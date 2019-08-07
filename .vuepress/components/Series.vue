<template>
    <div>
    <Pagination
        :prev="typeof prev === 'string' ? prev : undefined" 
        :next="typeof next === 'string' ? next : undefined" 
    />
    </div>
</template>

<script>
import Pagination from '../theme/components/Layout/Pagination.vue'
export default {
    name: 'Series',
    props: ['prev', 'next'],
    components: { Pagination },
}
</script>
