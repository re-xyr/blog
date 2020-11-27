const MarkdownIt = require('markdown-it')
const Katex = require('katex')

module.exports = {
    title: '喵.世界',
    description: 'ex falso quodlibet.',
    head: [
        ['link', {
            rel: 'stylesheet',
            href: "https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css",
            integrity: "sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG",
            crossorigin: "anonymous",
        }],
        ['link', {
            rel: 'stylesheet',
            href: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,700;0,900;1,300;1,700&display=swap",
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
                        Katex.renderToString(str, { throwOnError: false, displayMode: true }))
                    .replace(/(?<=[^\\])\$([^]+?)\$/mg, (_, str) =>
                        Katex.renderToString(str, { throwOnError: false, displayMode: false })),
                    env)
                    .replace(/\\\$/g, '$')
        },
    },
}
