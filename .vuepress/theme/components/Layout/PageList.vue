<template>
    <div class="pagelist">
        <div class="pagelist-item" v-for="page in pages">
            <a :href="page.path" class="pagelist-item-link">
                <h2 class="pagelist-item-title">{{ page.frontmatter.title }}</h2>
                <div class="pagelist-item-desc">{{ page.frontmatter.description }}</div>
            </a>
            <div class="pagelist-item-metadata">
                <span class="pagelist-item-metadata-author">{{ page.frontmatter.author }}</span>
                <span class="pagelist-item-metadata-date">{{ new Date(page.frontmatter.date).toLocaleDateString() }}</span>
                <a :href="`/category/${page.frontmatter.category}`" class="pagelist-item-metadata-category">{{ page.frontmatter.category }}</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pagelist-item {
    border-left: 10px solid gray;
    padding-left: 5px;
    margin: .5em;
}
.pagelist-item-link {
    display: block;
    margin-bottom: .5em;
}
.pagelist-item-metadata {
    font-weight: 500;
}
.pagelist-item-metadata > *::before {
    font-weight: 100;
}
.pagelist-item-metadata-date::before {
    content: ' 发表于 ';
    color: gray;
}
.pagelist-item-metadata-category::before {
    content: ' 分类 ';
    color: gray;
}
</style>


<script>
import Anchor from '../Anchor.vue'
export default {
    name: 'PageList',
    props: ['pages'],
    components: { Anchor }
}
</script>
