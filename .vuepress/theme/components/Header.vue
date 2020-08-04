<template>
    <header>
        <h1 class="header-title">
            <a href="/">{{ title }}</a>
        </h1>
        <div v-if="isHomepage" class="header-aside">
            <a href="/aboutme">about</a>
            <a href="/category">categories</a>
        </div>
        <div v-if="showMetadata" class="content-metadata">
            <template v-if="$page.frontmatter.date && new Date($page.frontmatter.date).toString() !== 'Invalid Date'">
                {{new Date($page.frontmatter.date).toLocaleDateString()}}
            </template>
            <template v-if="$page.frontmatter.category instanceof Array && $page.frontmatter.category.length > 0">
                <a v-for="cat in $page.frontmatter.category" :href="`/category/${cat}`">{{ cat }}</a>
            </template>
        </div>
    </header>
</template>

<style scoped>
    header {
        padding: 1em 0;
        border-bottom: solid 1px #ddd;
        line-height: 2em;
    }

    .header-title a {
        text-decoration: none;
    }

    .header-aside {
        text-align: right;
    }

    .content-metadata {
        font-size: .7em;
        color: gray;
        text-align: right;
    }

    .content-metadata a {
        color: gray !important;
        text-decoration: underline !important;
        margin-right: .3em;
    }

</style>

<script>
export default {
    name: 'Header',
    props: ['title', 'isHomepage', 'showMetadata'],
}
</script>
