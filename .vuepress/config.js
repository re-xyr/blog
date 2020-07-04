const MarkdownIt = require('markdown-it')
const Katex = require('katex')

module.exports = {
    title: '喵.世界',
    description: 'Not yet typed nor functional.',
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
                comment: {
                    // Which service you'd like to use
                    service: 'disqus',
                    // The owner's name of repository to store the issues and comments.
                    shortname: 'vuepress-plugin-blog',
                },
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
                    .replace(/\$\$(.+?)\$\$/g, (_, str) =>
                        Katex.renderToString(str, { throwOnError: false, displayMode: true }))
                    .replace(/\$(.+?)\$/g, (_, str) =>
                        Katex.renderToString(str, { throwOnError: false, displayMode: false })),
                    env)
        },
    },
}
