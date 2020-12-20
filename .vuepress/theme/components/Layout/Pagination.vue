<template>
    <section class="pagination">
        <a class="dim-anchor" :href="prev" v-if="prev">&leftarrow;</a>
        <a class="dim-anchor" :href="next" v-if="next">&rightarrow;</a>
    </section>
</template>

<style scoped>
.pagination {
    text-align: center;
    font-weight: bold;
}
</style>

<script>
export default {
    name: 'Pagination',
    props: ['prev', 'next'],
}
</script>
