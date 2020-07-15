<template>
    <header>
        <h1 class="header-title">
            <a href="/">{{ title }}</a>
        </h1>
        <div v-if="$route.path === '/'" class="header-aside">
            <a href="/aboutme">about</a>
            <a href="/category">categories</a>
            <a href="/friends">friends</a>
        </div>
        <div v-else-if="!$frontmatterKey && !$pagination" class="content-metadata">
            Posted
            <template v-if="$page.frontmatter.date && new Date($page.frontmatter.date).toString() !== 'Invalid Date'">
                on {{new Date($page.frontmatter.date).toLocaleDateString()}}
            </template>
            <template v-else>
                in the distant past
            </template>
            under
            <template v-if="$page.frontmatter.category instanceof Array && $page.frontmatter.category.length > 0">
                <template v-if="$page.frontmatter.category.length === 1">category</template>
                <template v-else>categories</template>
                <a v-for="cat in $page.frontmatter.category" :href="`/category/${cat}`">{{ cat }}</a>
            </template>
            <template v-else>
                no categories
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

    .content-metadata {
        font-size: .7em;
        color: gray;
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
    props: ['title'],
}
</script>
