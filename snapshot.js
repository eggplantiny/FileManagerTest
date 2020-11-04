
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
    return new Promise((resolve, reject) => {
        ffmpeg(path.resolve(`${folder}\\${fileName}.mp4`))
            .on('filenames', function (filenames) {
                console.log('screenshots are ' + filenames.join(', '))
            })
            // .on('end', function() {
            //     console.log('screenshots were saved')
            //     return resolve()
            // })
            // .on('error', function(err) {
            //     return reject(err)
            // })
            // .output(`${snapshotFolder}/${fileName}-$04d.jpg`)
            // .outputOptions(
            //     '-q:v', '8',
            //     '-vf', 'fps=1/10,scale=-1:120,tile=5x5',
            // )
            .run()
            .screenshots({
                count: 100,
                size: '1080x?',
                folder: snapshotFolder,
                finename: `${fileName}_%s.png`
            })
    })
}

async function run () {
    const snapshotFolder = makeSnapshotFolder(fileName)
    try {
        console.time('snapshot')
        await takeSnapShot(folder, fileName, snapshotFolder)
        console.timeEnd('snapshot')
    } catch (e) {
        console.log('an error happened: ' + e.message)
    }
}

run()
