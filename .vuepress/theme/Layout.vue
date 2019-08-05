<template>
    <div class="layout">
        <Header />
        
        <template v-if="$pagination">
            <PageList :pages="$pagination.pages" />
            <Pagination :prev="$pagination.prevLink" :next="$pagination.nextLink"/>
        </template>
        <Content v-else />

        <Footer />
    </div>
</template>

<script>
import Pagination from './components/Layout/Pagination.vue'
import PageList from './components/Layout/PageList.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
    name: 'Layout',
    components: {
        Pagination,
        PageList,
        Header,
        Footer,
    },
}
</script>
