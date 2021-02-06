const fs = require('fs')
const walk = require('walk')

function fileWalker (targetPath, skipMap = new Map()) {
  const minSize = 3e+8
  const files = []
  const walker = walk.walk(targetPath)
  let count = 0

  return new Promise ((resolve, reject) => {
    walker.on('file', function (root, stat, next) {
      const { size, name, type } = stat

      if (skipMap.has(name)) {
        return next()
      }

      if (size < minSize) {
        return next()
      }

      if (root.includes('temp')) {
        return next()
      }

      if (type !== 'file') {
        return next()
      }

      count += 1

      console.log(`[${count}] ${name}`)

      stat.path = root
      files.push(stat)

      next()
    })

    walker.on('end', function () {
      resolve(files, count)
    })

    walker.on('error', function (error) {
      reject(error)
    })

  })
}

function folderWalker (targetPath) {
  const statList = []
  let count = 0

  const folderNameList = fs.readdirSync(targetPath)
  return folderNameList
}

module.exports = {
  fileWalker,
  folderWalker
}
