const { createWriteStream } = require('fs')

const [, , name, title] = process.argv

const date = new Date()

const filename = `${__dirname}/../posts/${date.toISOString().slice(0, 10)}-${name}.md`

const template =
`---
title: ${title}
description: 
author: t532
date: ${date.toString()}
category:
    - Special:未分类
    - Special:未发布
hidden: true # delete this before publishing
---

# ${title}


`

createWriteStream(filename).write(template)
