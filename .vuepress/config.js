module.exports = {
    title: 't532\'s blog',
    description: 'Deadline is motivation',
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
                ],
            },
        ],
    ],
}
