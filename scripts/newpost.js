const { createWriteStream } = require('fs')

const [, , name, title] = process.argv

const date = new Date()

const filename = `${__dirname}/../posts/${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${name}.md`

const template =
`---
title: ${title}
date: ${date.toString()}
category:
hidden: true # delete this before publishing
---


`

createWriteStream(filename).write(template)
