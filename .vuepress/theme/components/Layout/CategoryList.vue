<template>
    <div class="catlist">
        <Anchor
            class="catlist-item"
            v-for="cat in $frontmatterKey.list"
            :href="cat.path"
        >
            Category: {{ cat.name }}
        </Anchor>
    </div>
</template>

<style scoped>
.catlist-item {
    display: block;
    font-size: 1.3em;
    margin: .5em;
}
.catlist-item,
.catlist-item:hover::before {
    width: 900px;
    max-width: 90vw;
}
</style>


<script>
import Anchor from '../Anchor.vue'
export default {
    name: 'CategoryList',
    props: ['list'],
    components: { Anchor },
}
</script>
