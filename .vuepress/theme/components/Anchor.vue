<template>
    <a
        class="anchor"
        :class="typeof tall !== 'undefined' ? 'tall' : 'normal'"
        :href="href"
    >
        <span><slot /></span>
    </a>
</template>

<style scoped>
.anchor {
    color: inherit;
    display: inline-block;
    text-decoration: none;
    transition: .7s;
}
.anchor.tall {
    height: 2em;
}
.anchor span {
    padding-left: .5em;
}
.anchor.tall span {
    line-height: 2.8em;
}
.anchor:hover {
    color: white;
}
.anchor::before {
    display: inline-block;
    content: '';
    transition: .5s;
    position: absolute;
    height: 1.2em;
    width: .3em;
    background: gray;
    z-index: -1;
}
.anchor.tall::before {
    height: 2em;
}
.anchor:hover::before {
    background: black;
}
</style>

<script>
export default {
    name: 'Anchor',
    props: ['href', 'tall'],
}
</script>

