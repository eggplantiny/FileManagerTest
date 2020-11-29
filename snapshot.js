
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg')
const path = require('path')
const fs = require('fs')
const ffmpeg = createFFmpeg({ log: true })

const folder = 'D:\\download\\torrent'
const fileName = 'FC2-PPV-802311'

function makeSnapshotFolder (fileName) {
    const targetPath = path.resolve(`./snapshots/${fileName}`)
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath)
    }
    return targetPath
}

async function run () {
    const snapshotFolder = makeSnapshotFolder(fileName)
    try {
        console.time('snapshot')
        // await ffmpeg.FS('writeFile', fileName, awa)
        console.timeEnd('snapshot')
    } catch (e) {
        console.log('an error happened: ' + e.message)
    }
}

run()
//
// ffmpeg -ss 00:01:09 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-01.jpg
// ffmpeg -ss 00:02:19 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-02.jpg
// ffmpeg -ss 00:03:29 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-03.jpg
// ffmpeg -ss 00:04:39 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-04.jpg
// ffmpeg -ss 00:05:49 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-05.jpg
// ffmpeg -ss 00:06:59 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-06.jpg
// ffmpeg -ss 00:08:09 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-07.jpg
// ffmpeg -ss 00:09:19 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-08.jpg
// ffmpeg -ss 00:10:29 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-09.jpg
// ffmpeg -ss 00:11:39 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-10.jpg
// ffmpeg -ss 00:12:49 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-11.jpg
// ffmpeg -ss 00:13:59 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-12.jpg
// ffmpeg -ss 00:15:09 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-13.jpg
// ffmpeg -ss 00:16:19 -i D:\download\torrent\FC2-PPV-802311.mp4 -vframes 1 snapshots/tmp/screencap-14.jpg
