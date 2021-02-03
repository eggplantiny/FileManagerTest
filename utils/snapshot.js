const path = require("path")
const ffmpeg = require("fluent-ffmpeg")

function makeTimestamp (count) {
  const startPositionPercent = 0
  const endPositionPercent = 100
  const addPercent = (endPositionPercent - startPositionPercent) / (count - 1)

  return Array(count).fill('').map((_, index) => `${Math.round(startPositionPercent + addPercent + index)}%`)
}

function takeSnapshot (
  fileName,
  filePath,
  percentCallback = null,
  options = {
    snapshotPath: 'snapshots'
  }) {

  let c = 0
  const videoPath = path.resolve(filePath, fileName)
  const screenshotPath =  path.resolve(__dirname, '..', options.snapshotPath, fileName)
  const timestampList = makeTimestamp(100)

  console.log(`videoPath: ${videoPath}, screenshotPath: ${screenshotPath}`)

  return new Promise((resolve, reject) => {
    function run () {
      ffmpeg(videoPath)
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

module.exports = {
  takeSnapshot
}
