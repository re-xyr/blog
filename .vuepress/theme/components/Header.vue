<template>
    <header>
        <h1 class="header-title">
            <a href="/">{{ title }}</a>
        </h1>
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
        border-bottom: solid 1px #ddd;
    }
    
    .header-title {
        font-family: Merriweather, KaTeX_Serif, han-heiti;
        font-size: 3em;
        line-height: 1em;
        padding: 1em 0;
        font-weight: 300;
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
