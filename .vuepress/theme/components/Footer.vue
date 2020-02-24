<template>
    <div class="footer">
        &copy; {{ new Date().getFullYear() }} t532
        <a href="/LICENSE">Contents distributed under CC-BY 4.0 Public License; Website Code distributed under MIT License.</a>
        <br />
        <a href="https://github.com/t532/blog">Built by t532 with ❤</a> / 
        <a href="https://vuepress.vuejs.org">Powered by VuePress</a>
    </div>
</template>

<style scoped>
.footer {
    color: gray;
    margin-top: 2em;
}
</style>

<script>
export default {
    name: 'Footer',
}
</script>
