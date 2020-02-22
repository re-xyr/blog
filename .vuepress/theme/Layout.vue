<template>
    <div class="layout" :class="$frontmatterKey ? 'fmidx' : ($pagination ? 'index' : 'post')">
        <Header :autoshow="$frontmatterKey || $pagination ? true : false" />
        <div class="main">
            <CategoryList v-if="$frontmatterKey" :list="$frontmatterKey.list" />
            <template v-else-if="$pagination">
                <PageList :pages="$pagination.pages" />
                <Pagination :prev="$pagination.prevLink" :next="$pagination.nextLink"/>
            </template>
            <MarkdownContent v-else />
        </div>
        <Footer />
    </div>
</template>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        /* ATTENTION: This background image ("the Image") is an original artwork by 望月しいな/Mochizuki Shiina ("the Illustrator") (see https://www.pixiv.net/artworks/78398601), and an inference has been made that all rights of the Image are reserved by the Illustrator (as no copyright declaration could be found), so the use of the Image may lead to a copyright violation. Thus, the Image shall be taken down whenever the Illustrator requests to. */
        background-image: url('img/theme-bg.jpg');
        background-color: rgba(255, 255, 255, 0.85);
        opacity: 1;
        animation: fadein 1s;
        background-attachment: fixed;
        background-position: 25%;
        background-size: cover;
        background-blend-mode: overlay;
        color: #111;
        font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
    }
    a {
        color: inherit;
    }
    .layout {
        padding: 3em 1em;
        margin: 0 auto;
        max-width: 1000px;
    }
    .main {
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
        padding: 2em 0;
    }
    @keyframes fadein {
        from {
            opacity: 0;
            background-color: #eee0;
        } 50% {
            opacity: 0;
            background-color: #eee0;
        } to {
            opacity: 1;
            background-color: #eeee;
        }
    }
</style>

<script>
import Pagination from './components/Layout/Pagination.vue'
import CategoryList from './components/Layout/CategoryList.vue'
import PageList from './components/Layout/PageList.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import MarkdownContent from './components/Layout/MarkdownContent.vue'
export default {
    name: 'Layout',
    components: {
        CategoryList,
        Pagination,
        PageList,
        Header,
        Footer,
        MarkdownContent,
    },
}
</script>
