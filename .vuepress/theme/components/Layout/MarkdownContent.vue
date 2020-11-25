<template>
    <section>
        <div v-if="!$frontmatter.notPost" class="content-metadata">
            <template v-if="$frontmatter.date && new Date($frontmatter.date).toString() !== 'Invalid Date'">
                {{new Date($frontmatter.date).toLocaleDateString()}}
            </template>
            <template v-if="$frontmatter.category instanceof Array && $frontmatter.category.length > 0">
                <a class="dim-anchor" v-for="cat in $frontmatter.category" :href="`/category/${cat}`">{{ cat }}</a>
            </template>
        </div>
        <Content class="content" />
    </section>
</template>

<style>
.content .header-anchor {
    display: none;
}

.content-metadata {
    font-size: .7em;
    color: gray;
    text-align: right;
}

.content-metadata a {
    margin-right: .3em;
}

.content {
    line-height: 1.7em;
}

.content ul,
.content ol {
    padding-left: 30px;
}

.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6,
.content p,
.content ul,
.content ol,
.content table,
.content blockquote,
.content pre {
    margin: 10px 0;
}

.content :not(pre)>code { color: gray; }

.content img {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: max-content;
}

.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
    font-family: Merriweather, KaTeX_Serif, han-songti;
    font-weight: 700;
    padding-top: 1em;
    padding-bottom: .3em;
}

.content h1 {
    font-size: 1.7em;
}
.content h2 {
    font-size: 1.3em;
}
.content h3 {
    font-size: 1.1em;
}
.content h4 {
    font-size: 0.95em;
}
.content h5 {
    font-size: 0.95em;
    color: gray;
}
.content h6 {
    font-size: 0.75em;
    color: gray;
}

.content hr {
    border: none;
    margin: 0;
}

.content hr::before {
    content: '* * *';
    display: block;
    text-align: center;
    margin-top: .5em;
    color: #aaa;
}

.content a {
    color: #005;
    transition: .2s;
}
.content a:visited { color: #305; }
.content a:hover {
    color: #f00;
    text-decoration: underline;
}

.content pre,
.content code {
    font-family: preferred-mono, KaTeX_Typewriter, monospace;
}

.content blockquote {
    padding: 1.5em;
    border-left: 5px solid #aaa;
    font-style: italic;
    color: gray;
}

.content table {
    border-collapse: collapse;
    width: 100%;
}

.content td,
.content th { 
    padding: .5em;
}

.content th {
    border-bottom: 3px double;
}

.content td {
    border-bottom: 1px solid;
}

.content strong {
    font-family: Merriweather, KaTeX_Main, han-heiti, sans-serif;
}

.content-footerlink {
    padding-right: .5em;
}

.license {
    text-align: center;
}
.license a {
    color: gray !important;
}
</style>


<script>
import 'prismjs/themes/prism-solarizedlight.css'
export default {
    name: 'MarkdownContent',
}
</script>
