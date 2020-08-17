<template>
    <header>
        <h1 class="header-title">
            <a href="/">{{ title }}</a>
        </h1>
        <div class="header-aside">
            <a class="dim-anchor" href="/aboutme">about</a>
            <a class="dim-anchor" href="/post">posts</a>
            <a class="dim-anchor" href="/category">categories</a>
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
</style>

<script>
export default {
    name: 'Header',
    props: ['title'],
}
</script>
