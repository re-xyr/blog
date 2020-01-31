<template>
    <div class="pagelist">
        <div class="pagelist-item" v-for="page in pages" v-if="!page.frontmatter.hidden">
            <a :href="page.path" class="pagelist-item-link">
                <h2 class="pagelist-item-title">{{ page.frontmatter.title }}</h2>
                <div class="pagelist-item-desc">{{ page.frontmatter.description }}</div>
            </a>
            <div class="pagelist-item-metadata">
                <span class="pagelist-item-metadata-author">{{ page.frontmatter.author }}</span>
                <span class="pagelist-item-metadata-date">{{ new Date(page.frontmatter.date).toLocaleDateString() }}</span>
                <span class="pagelist-item-metadata-category">
                    <span class="pagelist-item-metadata-category-item" v-for="cat in page.frontmatter.category">
                        <a :href="`/category/${cat}`">[ {{ cat }} ]</a>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pagelist-item {
    border-left: 10px solid gray;
    padding-left: 5px;
    margin-bottom: 2em;
    opacity: 0.8;
    transition: .2s;
}
.pagelist-item:hover {
    opacity: 1;
}
.pagelist-item:nth-last-child(1) {
    margin-bottom: 0;
}
.pagelist-item * {
    line-height: 1.8em;
}
.pagelist-item > * {
    padding-left: 10px;
}
.pagelist-item-link {
    display: block;
    margin-bottom: .5em;
    text-decoration: none;
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
.pagelist-item-metadata-category-item {
    padding-right: .5em;
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
