<template>
    <a
        class="friendanchor"
        :class="`friendanchor-${displayName}`"
        :href="href"
    >
        <div class="friendanchor-name">{{ displayName }}</div>
        <div class="friendanchor-url">@ {{ href }}</div>
    </a>
</template>

<style scoped>
.friendanchor {
    color: #333 !important;
    display: block;
    text-decoration: none !important;
    transition: .7s;
}
.friendanchor * {
    position: relative;
    z-index: 1;
}
.friendanchor.tall {
    height: 2em;
}
.friendanchor div {
    padding-left: .5em;
}
.friendanchor-name {
    font-size: 2em;
}
.friendanchor-url {
    margin-left: .7em;
}
.friendanchor:hover {
    color: white !important;
}
.friendanchor::before {
    display: inline-block;
    content: '';
    transition: .5s;
    position: absolute;
    height: 4em;
    width: .3em;
}
.friendanchor:hover::before {
    width: 20em;
}
</style>

<script>
export default {
    name: 'Friend',
    props: ['href', 'displayName'],
}
</script>
