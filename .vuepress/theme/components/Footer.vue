<template>
    <div class="footer">
        &copy; {{ new Date().getFullYear() }} Yumiko Ren
        <br />
        <a href="https://github.com/t532/blog">Website built by t532 with ❤</a> under a <a href="/LICENSE">MIT License</a> / 
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
