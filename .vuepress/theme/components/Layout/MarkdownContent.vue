<template>
    <section class="content">
        <Content />
    </section>
</template>

<style>
.content .header-anchor {
    display: none;
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
    font-family: KaTeX_Main, han-songti, serif;
    padding: 2em 0;
    text-align: center;
    font-weight: bold;
    font-size: 1.5em;
}
.content h2 {
    font-family: KaTeX_Main, han-kaiti, serif;
    padding: 2em 0;
    text-align: center;
    font-weight: normal;
    font-size: 1.3em;
}
.content h3 {
    font-family: KaTeX_Main, han-songti, serif;
    padding: 1em 0 1em 1em;
    font-weight: normal;
    font-size: 1.1em;
}
.content h4 {
    font-family: KaTeX_Main, han-songti, serif;
    padding: 1em 0 1em 1em;
    font-weight: normal;
    font-size: 1em;
    color: #777;
}
.content h5 {
    display: none;
}
.content h6 {
    display: none;
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

.content strong {
    font-family: KaTeX_Main, han-heiti, sans-serif;
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
