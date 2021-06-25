const MarkdownIt = require('markdown-it')
const Katex = require('katex')

module.exports = {
    title: '喵.世界',
    description: 'ex falso quodlibet.',
    head: [
        ['link', {
            rel: 'stylesheet',
            href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
            crossorigin: "anonymous",
        }],
    ],
    theme: 'vuepress-theme-chronicle',
    themeConfig: {
        root: '/post/',
        nav: [
            { text: 'about', link: '/about' },
            { text: 'post', link: '/post' },
            { text: 'categories', link: '/category' },
        ],
        copy: {
            name: 'daylily',
            link: '/about.html#copy',
            beginYear: '2019',
        },
        feed: {
            canonical_base: 'https://xn--i2r.xn--rhqv96g/',
        },
    },
    markdown: {
        extendMarkdown(md) {
            md.render = (src, env) =>
                MarkdownIt.prototype.render.call(
                    md,
                    src
                        .replace(/(?<=[^\\])\$\$([^]+?)\$\$/mg, (_, str) =>
                            Katex.renderToString(str, { throwOnError: false, displayMode: true, output: 'html' }))
                        .replace(/(?<=[^\\])\$(\S|\S[^]*?\S)\$/mg, (_, str) =>
                            Katex.renderToString(str, { throwOnError: false, displayMode: false, output: 'html' })),
                    env)
                    .replace(/\\\$/g, '$')
                    .replace(/<code>\s+<span class="katex">(.+?)<\/span>\s+<\/code>/mg, '<span class="katex">$1</span>')
        },
    },
}
