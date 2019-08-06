<template>
    <div class="layout" :class="$frontmatterKey ? 'fmidx' : ($pagination ? 'index' : 'post')">
        <Header />
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
        background: #eee;
        color: #111;
        font-family: 'Fira Code', Monaco, Consolas, Menlo, 'Ubuntu Mono', 'Segoe UI', 'Microsoft YaHei', sans-serif;
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
