<template>
    <section class="pagelist">
        <div class="item" v-for="page in pages" v-if="!page.frontmatter.hidden">
            <a :href="page.path" class="item-link">
                <div class="item-title">{{ page.frontmatter.title }}</div>
            </a>
            <span class="item-date">{{ new Date(page.frontmatter.date).toLocaleDateString() }}</span>
            <span class="item-category">
                <span
                    class="item-metadata-category-item"
                    v-for="cat in page.frontmatter.category">
                    <a :href="`/category/${cat}`">[ {{ cat }} ]</a>
                </span>
            </span>
        </div>
    </section>
</template>

<style scoped>
.item {
    padding: 1em 0;
}

.item-title {
    font-size: 1.2em;
}
</style>


<script>
export default {
    name: 'PageList',
    props: ['pages'],
}
</script>
