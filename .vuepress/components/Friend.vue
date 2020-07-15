<template>
    <a
        class="friendanchor"
        :href="href"
    >
        <div class="friendanchor-name">{{ title }} &rightarrow;</div>
        <div class="friendanchor-url">by {{ name }} @ {{ href }}</div>
    </a>
</template>

<style scoped>
.friendanchor {
    color: #555 !important;
    display: block;
    text-decoration: none !important;
    padding: .5em 0;
}
.friendanchor-name {
    font-size: 2em;
}
.friendanchor-url {
    margin-left: .7em;
}
</style>

<script>
export default {
    name: 'Friend',
    props: ['href', 'title', 'name'],
}
</script>
