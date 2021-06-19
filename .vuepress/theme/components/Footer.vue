<template>
    <div class="footer">
        <a class="dim-anchor" href="/about.html#copy">&copy; daylily 2019 - {{ new Date().getFullYear() }}</a>
    </div>
</template>

<style scoped>
.footer {
    margin-top: 1em;
    text-align: right;
}
</style>

<script>
export default {
    name: 'Footer',
}
</script>
