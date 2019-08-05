<template>
    <div class="header">
        <h1 class="header-title">
            <a href="/">{{ $site.title }}</a>
        </h1>
        <div class="header-slogan">{{ $site.description }}</div>
        <div class="header-accounts">
            <a
                v-for="acc in Object.entries(aboutme.accounts)"
                :href="acc[1]" 
                class="header-accounts-item"
            >{{ acc[0] }}</a>
        </div>
        <div class="header-projects">
            <a
                v-for="acc in Object.entries(aboutme.projects)"
                :href="acc[1]" 
                class="header-projects-item"
            >{{ acc[0] }}</a>
        </div>
        <a href="/category" class="header-category">categories</a>
    </div>
</template>

<script>
import aboutme from '../../aboutme'
export default {
    name: 'Header',
    data() { 
        return { aboutme }
    }
}
</script>
