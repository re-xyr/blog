<template>
    <div class="fmidx">
        <Header />
        <a
            class="fmidx-item"
            v-for="cat in $frontmatterKey.list"
            :href="cat.path"
        >
            {{ cat.name }}
        </a>
        <Footer />
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
    name: 'FrontmatterIndex',
    components: {
        Header,
        Footer,
    },
}
</script>
