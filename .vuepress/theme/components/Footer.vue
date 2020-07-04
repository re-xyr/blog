<template>
    <div class="footer">
        &copy; {{ new Date().getFullYear() }} Xy Ren. /
        <a href="/rss.xml">RSS</a> /
        <a href="/feed.atom">Atom</a> /
        <a href="/feed.json">JSON</a>
        <br />
        <a href="https://github.com/xy-ren/blog">Website built by Xy Ren with ❤</a> under a <a href="https://github.com/xy-ren/blog/blob/master/LICENSE">MIT License</a>. /
        <a href="https://vuepress.vuejs.org">Powered by VuePress.</a>
    </div>
</template>

<style scoped>
.footer {
    color: gray;
    margin-top: 1em;
}
</style>

<script>
export default {
    name: 'Footer',
}
</script>
