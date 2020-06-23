<template>
    <header>
        <h1 class="header-title">
            <span>{{ title }}</span>
        </h1>
        <a v-if="!isMain" href="/"><strong>back</strong></a>
        <a href="/aboutme">about</a>
        <a href="/category">categories</a>
        <a href="/friends">friends</a>
    </header>
</template>

<style scoped>
    header {
        padding: 1em 0;
        border-bottom: solid 1px #ddd;
        line-height: 2em;
    }
</style>

<script>
export default {
    name: 'Header',
    props: ['title', 'isMain'],
}
</script>
