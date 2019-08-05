<template>
    <div class="pagination">
        <a v-if="prev" :href="prev">&lsaquo;</a>
        <a v-if="next" :href="next">&rsaquo;</a>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['prev', 'next'],
}
</script>
