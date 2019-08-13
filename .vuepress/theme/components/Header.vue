<template>
    <div class="header">
        <div class="header-main">
            <div class="header-main-content">
                <h1 class="header-title">
                    <Anchor class="header-title-anchor" href="/" tall>{{ $site.title }}</Anchor>
                </h1>
                <div class="header-slogan">{{ $site.description }}</div>
            </div>
            <div class="header-main-float" @click="expand = !expand">...</div>
        </div>
        <div class="header-expand" v-if="expand">
            <div class="header-accounts">
                <Anchor
                    v-for="acc in Object.entries(aboutme.accounts)"
                    :href="acc[1]" 
                    class="header-accounts-item"
                >{{ acc[0] }}</Anchor>
            </div>
            <div class="header-projects">
                <Anchor
                    v-for="acc in Object.entries(aboutme.projects)"
                    :href="acc[1]" 
                    class="header-projects-item"
                >{{ acc[0] }}</Anchor>
            </div>
        </div>
        <Anchor href="/aboutme" class="header-anchor">∦ 关于我</Anchor>
        <Anchor href="/category" class="header-anchor">≡ 分类</Anchor>
        <Anchor href="/friends" class="header-anchor">⇋ 友链</Anchor>
    </div>
</template>

<style scoped>
.header {
    margin-bottom: 2em;
}
.header-main {
    position: relative;
    display: flex;
    flex-wrap: wrap;
}
.header-main-content {
    padding-right: 2em;
}
.header-main-float {
    position: absolute;
    right: 0;
    width: auto;
    min-width: 40px;
    height: 40px;
    padding: 7px 5px;
    border-radius: 999px;
    background: #fffa;
    box-shadow: 0 0 3px gray;
    cursor: pointer;
    user-select: none;
    transition: .1s;
}
.header-main-float:hover {
    box-shadow: 0 0 5px gray;
}
.header-main-float:active {
    box-shadow: 0 0 2px black;
}
.header-expand {
    margin-bottom: 1.5em;
    animation: slight-fadein .5s;
    opacity: 1;
}
.header-title {
    font-weight: 300;
}
.header-title-anchor:hover::before {
    width: 7.5em;
}
.header-slogan {
    margin-bottom: 1em;
}
.header-accounts,
.header-projects {
    margin-bottom: .5em;
}
.header-accounts::before,
.header-projects::before {
    display: block;
    color: gray;
}
.header-accounts::before {
    content: 'Find Me In:';
}
.header-projects::before {
    content: 'My Projects:'
}
.header-accounts-item,
.header-accounts-item:hover::before,
.header-projects-item,
.header-projects-item:hover::before {
    width: 8em;
}
.header-anchor {
    font-weight: bold;
    font-size: 1.2em;
}
.header-anchor,
.header-anchor:hover::before {
    width: 6em;
}
@keyframes slight-fadein {
    from {
        opacity: 0.4;
    } to {
        opacity: 1;
    }
}
</style>

<script>
import aboutme from '../../aboutme'
import Anchor from './Anchor.vue'
export default {
    name: 'Header',
    data() { 
        return { aboutme, expand: false }
    },
    components: { Anchor },
}
</script>
