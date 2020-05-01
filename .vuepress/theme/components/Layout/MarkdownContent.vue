<template>
    <div class="content-container">
        <div class="content">
            <Content />
            <blockquote v-if="!$page.frontmatter.notPost">
                <p>
                    本作品 ｢ <strong><em>{{ $page.frontmatter.title }}</em></strong> ｣ 应用
                    <a href="https://creativecommons.org/licenses/by/4.0/">知识共享 署名 4.0 国际协议</a>。
                </p>
                <p>
                    The work <strong><em>{{ $page.frontmatter.title }}</em></strong>
                    is published under a
                    <a href="https://creativecommons.org/licenses/by/4.0/">Createive Commons 4.0 Attribution 4.0 International License</a>.
                </p>
            </blockquote>
        </div>
        <div class="content-end">
            おわり
        </div>
    </div>
</template>

<style>

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
    font-family: 'Fira Code', 'Fira Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
}

:not(pre) > code {
    background: #ddd;
    padding: .2em .3em;
    border-radius: 5px;
}

.content blockquote {
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
import 'prismjs/themes/prism-tomorrow.css'
export default {
    name: 'MarkdownContent',
}
</script>
