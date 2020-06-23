<template>
    <a
        class="friendanchor"
        :class="`friendanchor-${id}`"
        :href="href"
    >
        <div class="friendanchor-name">{{ title }}</div>
        <div class="friendanchor-url">by {{ name }} @ {{ href }}</div>
    </a>
</template>

<style scoped>
.friendanchor {
    color: #555 !important;
    display: block;
    text-decoration: none !important;
    transition: .7s;
}
.friendanchor-name {
    font-size: 2em;
}
.friendanchor-url {
    margin-left: .7em;
}
.friendanchor:hover {
    color: black !important;
}
</style>

<script>
export default {
    name: 'Friend',
    props: ['href', 'title', 'name', 'id'],
}
</script>
