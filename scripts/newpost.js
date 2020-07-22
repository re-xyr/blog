const { createWriteStream } = require('fs')

const [, , name, title] = process.argv

const date = new Date()

const filename = `${__dirname}/../posts/${date.toISOString().slice(0, 10)}-${name}.md`

const template =
`---
title: ${title}
date: ${date.toString()}
category:
hidden: true # delete this before publishing
---


`

createWriteStream(filename).write(template)
