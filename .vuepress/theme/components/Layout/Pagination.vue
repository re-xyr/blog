<template>
    <section class="pagination">
        <div class="anchor" v-if="prev">
            <a :href="prev">&laquo; Prev</a>
        </div>
        <div class="anchor" v-if="next">
            <a :href="next">Next &raquo;</a>
        </div>
    </section>
</template>

<style scoped>
.pagination {
    color: gray;
    text-align: center;
    padding-top: 3em;
}
</style>

<script>
export default {
    name: 'Pagination',
    props: ['prev', 'next'],
}
</script>
