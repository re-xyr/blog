const MarkdownIt = require('markdown-it')
const Katex = require('katex')

module.exports = {
    title: '喵.世界',
    description: 'ex falso quodlibet.',
    head: [
        ['link', {
            rel: 'stylesheet',
            href: "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css",
            crossorigin: "anonymous",
        }],
        ['link', {
            rel: 'preconnect',
            href: "https://fonts.googleapis.com",
        }],
        ['link', {
            rel: 'preconnect',
            href: "https://fonts.gstatic.com",
        }],
        ['link', {
            rel: 'stylesheet',
            href: "https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap",
        }],
        ['link', {
            rel: 'stylesheet',
            href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap",
        }],
    ],
    plugins: [
        [
            '@vuepress/blog', {
                directories: [
                    {
                        id: 'Post',
                        dirname: 'posts',
                        path: '/post/',
                    },
                ], frontmatters: [
                    {
                        id: 'Category',
                        keys: ['category'],
                        path: '/category/',
                        layout: 'FrontmatterIndex',
                    },
                ], globalPagination: {
                    lengthPerPage: 10,
                }, feed: {
                    canonical_base: 'http://xn--i2r.xn--rhqv96g/',
                },
            },
        ],
    ],
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
