<template>
    <header>
        <div class="header-title">
            <a href="/">{{ title }}</a>
        </div>
        <div class="header-aside">
            <a class="dim-anchor" href="/about">about</a>
            <a class="dim-anchor" href="/post">posts</a>
            <a class="dim-anchor" href="/category">categories</a>
        </div>
    </header>
</template>

<style scoped>
    header {
        padding: 1em 0;
        display: flex;
    }
    
    .header-title {
        flex-grow: 1;
        font-size: 1.3em;
        font-weight: bold;
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
