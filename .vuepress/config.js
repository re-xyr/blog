const MarkdownIt = require('markdown-it')
const Katex = require('katex')
const directives = {
    AUTOBREAK: str =>
        str.replace(/\n/g, "  \n"),
    INDENTSYM: str =>
        str.replace(/^(\/+)/mg, str =>
            str.replace(/\//g, "&nbsp;&nbsp;&nbsp;&nbsp;"))
}
const runDirectives = str => {
    const match = str
    .match(/<!-- (.+?) -->$/)
    if (match) {
        match[1]
        .split(', ')
        .forEach(dir => str = directives[dir](str))
    }
    return str
}
module.exports = {
    title: 't532\'s blog',
    description: 'Deadline is motivation',
    head: [
        ['link', {
            rel: 'stylesheet',
            href: "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css",
            integrity: "sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG",
            crossorigin: "anonymous",
        }],
    ],
    plugins: [
        [
            '@vuepress/blog', {
                directories: [
                    {
                        id: 'post',
                        dirname: 'posts',
                        path: '/',
                    },
                ], frontmatters: [
                    {
                        id: 'category',
                        keys: ['category'],
                        path: '/category/',
                        layout: 'FrontmatterIndex',
                    },
                ], feed: {
                    canonical_base: 'https://t532.github.io',
                },
            },
        ],
    ],
    markdown: {
        extendMarkdown(md) {
            md.render = (src, env) =>
                MarkdownIt.prototype.render.call(
                    md,
                    runDirectives(src)
                    .replace(/\$\$(.+?)\$\$/g, (_, str) =>
                        Katex.renderToString(str, { throwOnError: false, displayMode: true }))
                    .replace(/\$(.+?)\$/g, (_, str) =>
                        Katex.renderToString(str, { throwOnError: false, displayMode: false })),
                    env)
        },
    },
}
