<template>
    <div class="pagination">
        <Anchor class="pagination-anchor" v-if="prev" :href="prev">&laquo; Prev</Anchor>
        <Anchor class="pagination-anchor" v-if="next" :href="next">Next &raquo;</Anchor>
    </div>
</template>

<style>
.pagination-anchor,
.pagination-anchor:hover::before {
    width: 10em;
}
.pagination-anchor {
    font-weight: bold;
    display: block !important;
    margin: 0 auto;
}
</style>


<script>
import Anchor from '../Anchor.vue'
export default {
    name: 'Pagination',
    props: ['prev', 'next'],
    components: { Anchor },
}
</script>
