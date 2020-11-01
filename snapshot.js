
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs')

const folder = 'D:\\download\\torrent\\FC2-PPV-1491596'
const fileName = 'FC2-PPV-1491596'

function makeSnapshotFolder (fileName) {
    const targetPath = path.resolve(`./snapshots/${fileName}`)
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath)
    }
    return targetPath
}

function takeSnapShot (folder, fileName, snapshotFolder) {
    ffmpeg(path.resolve(`${folder}\\${fileName}.mp4`))
        .noAudio()
        .withInputFps(1)
        .on('filenames', function (filenames) {
            console.log('screenshots are ' + filenames.join(', '))
        })
        .on('end', function() {
            console.log('screenshots were saved')
        })
        .on('error', function(err) {
            console.log('an error happened: ' + err.message)
        })
        .screenshots({
            count: 100,
            size: '1080x?',
            folder: snapshotFolder,
            finename: `${fileName}_%s.png`
        })
}

function run () {
    const snapshotFolder = makeSnapshotFolder(fileName)
    takeSnapShot(folder, fileName, snapshotFolder)
}

run()
