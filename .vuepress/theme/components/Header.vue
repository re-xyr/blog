<template>
    <div class="header">
        <div class="header-main">
            <div class="header-main-left">
                <h1 class="header-title">
                    <Anchor class="header-title-anchor" href="/" tall>{{ $site.title }}</Anchor>
                </h1>
                <div class="header-slogan">{{ $site.description }}</div>
            </div>
            <div class="header-main-right">
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
        </div>
        <Anchor href="/category" class="header-category">&equiv; 分类</Anchor>
        <Anchor href="/friends" class="header-category">&para; 友链</Anchor>
    </div>
</template>

<style scoped>
.header {
    margin-bottom: 2em;
}
.header-main {
    display: flex;
    flex-wrap: wrap;
}
.header-main-left {
    padding-right: 2em;
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
    width: 10em;
}
.header-category {
    font-weight: bold;
    font-size: 1.2em;
}
.header-category,
.header-category:hover::before {
    width: 10em;
}
</style>

<script>
import aboutme from '../../aboutme'
import Anchor from './Anchor.vue'
export default {
    name: 'Header',
    data() { 
        return { aboutme }
    },
    components: { Anchor },
}
</script>
