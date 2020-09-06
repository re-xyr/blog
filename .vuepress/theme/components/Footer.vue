<template>
    <div class="footer">
        <a class="dim-anchor" href="/about.html#copy">&copy;</a>
        <div class="footer-href">
            <a class="dim-anchor" :href="$route.path">http://喵.世界{{ $route.path }}</a>
        </div>
    </div>
</template>

<style scoped>
.footer {
    margin-top: 1em;
    text-align: right;
}
.footer-href {
    font-size: .7em;
}
</style>

<script>
export default {
    name: 'Footer',
}
</script>
