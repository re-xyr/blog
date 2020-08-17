<template>
    <section class="pagination">
        <div class="pagination-end" v-if="!next">— You've reached the very beginning of the timeline. —</div>
        <a :href="prev" v-if="prev">&leftarrow; Newer</a>
        <a :href="next" v-if="next">Older &rightarrow;</a>
    </section>
</template>

<style scoped>
.pagination {
    color: gray;
    text-align: center;
}

.pagination-end {
    font-size: .6em;
}
</style>

<script>
export default {
    name: 'Pagination',
    props: ['prev', 'next'],
}
</script>
