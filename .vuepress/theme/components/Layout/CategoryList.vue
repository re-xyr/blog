<template>
    
    <div class="catlist">
        <h1>分类 / Categories</h1>
        <Anchor
            class="catlist-item"
            :class="/.+:/.test(cat.name) ? 'catlist-special' : ''"
            v-for="cat in list.sort(({ name: a }, { name: b }) => a > b ? 1 : -1)"
            :href="cat.path"
        >
            {{ cat.name }}
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
.catlist-special {
    color: gray;
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
