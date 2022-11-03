// ref - https://github.com/miyaoka/miyaoka.dev/blob/09020a7ad0/next.config.js

const fs = require('fs')

let isUpdating = false
const postLib = `${__dirname}/pages/posts/[slug].tsx`

const onChangePost = () => {
  if (isUpdating) return
  isUpdating = true
  const content = fs.readFileSync(postLib, 'utf-8')

  // libファイルにコードを書き加えて強制的にHMRを起こす
  fs.writeFileSync(
    postLib,
    `${content}\nconsole.log('updatedAt: ${new Date().toISOString()}')`
  )
  // 0.5秒後に元に戻す
  setTimeout(() => {
    fs.writeFileSync(postLib, content)
    isUpdating = false
  }, 500)
}
require('chokidar')
  .watch('./contents', { ignoreInitial: true })
  .on('add', onChangePost)
  .on('change', onChangePost)

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
