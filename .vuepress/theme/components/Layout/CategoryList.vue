<template>
    <section>
        <a
            class="item"
            :class="/.+:/.test(cat.name) ? 'catlist-special' : ''"
            v-for="cat in list.sort(({ name: a }, { name: b }) => a > b ? 1 : -1)"
            :href="cat.path"
        >
            {{ cat.name }}
        </a>
    </section>
</template>

<style scoped>
section {
    padding-top: 1em;
}
.item {
    padding: .3em;
    display: block;
}
</style>


<script>
export default {
    name: 'CategoryList',
    props: ['list'],
}
</script>
