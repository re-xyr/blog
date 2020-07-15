<template>
    <div class="footer">
        &copy; {{ new Date().getFullYear() }} Xy Ren. <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a>.
        <a href="/feed" name="RSS">Feed</a>.
        <a href="https://github.com/xy-ren/blog">Source</a>.
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
