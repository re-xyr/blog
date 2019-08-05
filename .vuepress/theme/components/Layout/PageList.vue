<template>
    <div class="pagelist">
        <div class="pagelist-item" v-for="page in pages">
            <a :href="page.path">
                <h2 class="pagelist-item-title">{{ page.frontmatter.title }}</h2>
                <div class="pagelist-item-desc">{{ page.frontmatter.description }}</div>
            </a>
            <div class="pagelist-item-metadata">
                <span class="pagelist-item-metadata-author">{{ page.frontmatter.author }}</span>
                <span class="pagelist-item-metadata-date">{{ page.frontmatter.date }}</span>
                <a :href="`/category/${page.frontmatter.category}`" class="pagelist-item-metadata-category">{{ page.frontmatter.category }}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageList',
    props: ['pages'],
}
</script>
