import * as fs from 'fs'
import prompts from 'prompts'
import { categories as categoriesConst } from '../constants/categories'
;(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'title',
      message: 'Please input title of a new post',
    },
    {
      type: 'multiselect',
      name: 'categories',
      message: 'Pick categories',
      choices: categoriesConst.map((category) => ({
        title: category,
        value: category,
      })),
    },
  ])

  const { title, categories } = response as {
    title: string
    categories: string[]
  }

  const baseBody = `---
title: ${title}
category:${categories.reduce((acc, category) => `\n${acc}  - ${category}`, '')}
createdAt: ${new Date().toISOString()}
---
`
  const filename = title.replace(/\'/g, '').toLowerCase().replace(/ /g, '-')
  fs.writeFile(`contents/${filename}.md`, baseBody, (err) => {
    if (err) console.log(err)
    const proc = require('child_process').spawn('pbcopy')
    proc.stdin.write(filename)
    proc.stdin.end()
    console.log('Created a post file and copied the file name:', filename)
  })
})()
