const walk = require('walk')
const path = require('path')

const targetPath = path.resolve('D:\\download\\torrent')

const walker = walk.walk(targetPath)

const files = []

const minSize = 3e+8

function getExtension (path) {
    const basename = path.split(/[\\/]/).pop()
    const pos = basename.lastIndexOf(".")

    if (basename === "" || pos < 1) {
        return null
    }

    return basename.slice(pos + 1)
}

walker.on('file', function (root, stat, next) {
    const { name, size } = stat
    if (size < minSize) {
        return next()
    }
    stat.root = root
    console.log(name)
    files.push(stat)
    next()
})

walker.on('end', function () {
    console.log(files)
})
