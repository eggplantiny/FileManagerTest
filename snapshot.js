const fs = require("fs")
const path = require("path")
const ffmpeg = require("fluent-ffmpeg")


const fileName = 'FC2-PPV-1616189_1.mp4'

function makeTimestamp (count) {
  const startPositionPercent = 0
  const endPositionPercent = 100
  const addPercent = (endPositionPercent - startPositionPercent) / (count - 1)

  return Array(count).fill('').map((_, index) => `${Math.round(startPositionPercent + addPercent + index)}%`)
}

const timestampList = makeTimestamp(100)

function takeScreenshots (fileName, percentCallback = null, options = {
  videoPath: 'videos',
  screenshotPath: 'screenshots'
}) {

  let c = 0
  const filePath = path.resolve(__dirname, options.videoPath, fileName)
  const screenshotPath =  path.resolve(__dirname, options.screenshotPath, fileName)

  console.log(filePath, screenshotPath)

  return new Promise((resolve, reject) => {
    function run () {
      ffmpeg(filePath)
        .on('start', () => {
        })
        .on('end', () => {
          if (typeof percentCallback === 'function') {
            percentCallback(c, timestampList.length)
          }

          c += 1

          if (c < timestampList.length) {
            return run(filePath)
          }

          resolve()
        })
        .on('error', error => {
          console.error(error)
          reject(error)
        })
        .screenshots({
          count: 1,
          timemarks: [timestampList[c]],
          filename: `%b-${c + 1}.jpg`
        }, screenshotPath)
    }

    run()
  })
}

console.log('start take screenshot')
takeScreenshots(fileName, (c, a) => console.log(`${fileName} sceenshot: ${c / a * 100}%`))
  .then(() => console.log('complete'))
  .catch(error => console.error(error))


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
