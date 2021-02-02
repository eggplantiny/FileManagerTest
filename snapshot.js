const fs = require("fs")
const path = require("path")
const ffmpeg = require("fluent-ffmpeg")


const fileName = 'FC2-PPV-1616189_1.mp4'
const filePath = path.resolve(__dirname, 'videos', fileName)

function makeTimestamp (count) {
  const startPositionPercent = 0
  const endPositionPercent = 99
  const addPercent = (endPositionPercent - startPositionPercent) / (count - 1)

  return Array(count).fill('').map((_, index) => `${Math.round(startPositionPercent + addPercent + index)}%`)
}

function takeScreenshots(file, c = 0) {
  const timestampList = makeTimestamp(99)

  ffmpeg(file)
    .on("start", () => {
        if (c < 1) {
            console.log(`start taking screenshots`)
        }
    })
    .on("end", () => {
        console.log(`taken screenshot: ${c}`)

        if (c < timestampList.length) {
            takeScreenshots(file, c + 1)
        }
    })
    .screenshots({
        count: 1,
        timemarks: [timestampList[c]],
        filename: `%b-${c + 1}.jpg`
    }, path.join(path.dirname(file), `screenshots`))
}

takeScreenshots(filePath)


function makeSnapshotFolder (fileName) {
    const targetPath = path.resolve(`./snapshots/${fileName}`)
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath)
    }
    return targetPath
}

//  TODO    https://github.com/fireship-io/react-wasm-gif-maker/blob/main/src/App.jsx
//  TODO    https://www.youtube.com/watch?v=-OTc0Ki7Sv0&list=PL0CDLPpiCzR5O2GbMpthYYScV4G83FDmq&index=3&ab_channel=Fireship
//  TODO    https://www.peterbe.com/plog/fastest-way-to-take-screencaps-out-of-videos

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
