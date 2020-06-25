<template>
    <div class="layout">
            <template v-if="$frontmatterKey">
                <Header title="Categories" />
                <main>
                    <CategoryList :list="$frontmatterKey.list" />
                </main>
            </template>
            <template v-else-if="$pagination">
                <Header :title="$site.title" :isMain="true" />
                <main>
                    <PageList :pages="$pagination.pages" />
                    <Pagination :prev="$pagination.prevLink" :next="$pagination.nextLink"/>
                </main>
            </template>
            <template v-else>
                <Header :title="$frontmatter.title" />
                <main>
                    <MarkdownContent />
                </main>
            </template>
        </main>
        <Footer />
    </div>
</template>

<style>
    @font-face {
        font-family: han-songti;
        src:
            local('Source Han Serif'),
            local('Noto Serif CJK'),
            local('Adobe Song Std')
            local('STZhongsong'),
            local('Songti SC'),
            local('STSong'),
            local('SimSun');
    }
    @font-face {
        font-family: han-kaiti;
        src:
            local('STKaiti'),
            local('Kaiti SC'),
            local('KaiTi');
    }
    @font-face {
        font-family: han-heiti;
        src:
            local('Source Han Sans'),
            local('Noto Sans CJK'),
            local('Adobe Heiti Std')
            local('PingFang SC'),
            local('Microsoft YaHei'),
            local('STHeiti'),
            local('Heiti SC'),
            local('SimHei');
    }
    @font-face {
        font-family: han-fangsong;
        src:
            local('Adobe Fangsong Std'),
            local('STFangsong'),
            local('FangSong');
    }
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    a {
        color: inherit;
    }
    .layout {
        color: #222;
        font-family: KaTeX_Main, han-songti, serif;
        padding: 0 3em;
        margin: 3em auto;
        max-width: 1000px;
        font-size: 1.2em;
        line-height: 1.5em;
        background-color: white;
    }
    main {
        padding-top: 1em;
    }
    @media screen and (max-width: 768px) {
        .layout {
            padding: 0 1em;
            margin: 1em auto;
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
