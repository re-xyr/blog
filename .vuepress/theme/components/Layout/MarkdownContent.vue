<template>
    <section class="content" lang="zh-CN">
        <div class="content-metadata">
            Posted
            <template v-if="$page.frontmatter.date && new Date($page.frontmatter.date).toString() !== 'Invalid Date'">
                on {{new Date($page.frontmatter.date).toLocaleDateString()}}
            </template>
            <template v-else>
                in the distant past
            </template>
            under
            <template v-if="$page.frontmatter.category instanceof Array && $page.frontmatter.category.length > 0">
                <template v-if="$page.frontmatter.category.length === 1">category</template>
                <template v-else>categories</template>
                <a v-for="cat in $page.frontmatter.category" :href="`/category/${cat}`">{{ cat }}</a>
            </template>
            <template v-else>
                no categories
            </template>
        </div>
        <Content />
        <blockquote class="content-end" v-if="!$page.frontmatter.notPost">
            <p>
                本作品应用
                <a href="https://creativecommons.org/licenses/by/4.0/">知识共享 署名 4.0 国际协议</a>。
                <br />
                The work is published under a
                <a href="https://creativecommons.org/licenses/by/4.0/">Createive Commons 4.0 Attribution 4.0 International License</a>.
            </p>
        </blockquote>
    </section>
</template>

<style>
.content-metadata {
    font-size: .7em;
    color: gray;
}

.content-metadata a {
    color: gray !important;
    text-decoration: underline !important;
    margin-right: .3em;
}

.content .header-anchor {
    text-decoration: none;
    color: #aaa !important;
    font-weight: 100;
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
    line-height: 1.8em;
}

.content img {
    display: block;
    margin: 0 auto;
    width: 100%;
    max-width: max-content;
}

.content h1 {
    font-size: 2em;
}

.content a {
    color: #33a;
    transition: .2s;
    text-decoration: none;
}
.content a:visited { color: #a3a; }
.content a:hover {
    color: #f00;
    text-decoration: underline;
}

.content pre,
.content code {
    font-family: KaTeX_Typewriter;
}

.content blockquote {
    font-family: KaTeX_Main, han-fangsong, serif;
    padding-left: 1em;
    border-left: 5px solid #aaa;
    color: gray;
}

.content table {
    border-collapse: collapse;
}

.content td,
.content th {
    border: 1px solid #ccc;
    padding: .5em;
}

.content thead tr,
.content tbody tr:nth-child(2n) {
    background: #e5e5e5;
}

.content em {
    font-family: KaTeX_Main, han-kaiti, serif;
}

.content em:lang(zh) {
    font-style: normal;
}

.content strong {
    font-family: KaTeX_Main, han-heiti, sans-serif;
}

.content-end {
    font-family: sans-serif;
    text-align: center;
    color: gray;
    font-size: 0.7em;
}

.content-footerlink {
    padding-right: .5em;
}
</style>


<script>
import 'prismjs/themes/prism-solarizedlight.css'
export default {
    name: 'MarkdownContent',
}
</script>
