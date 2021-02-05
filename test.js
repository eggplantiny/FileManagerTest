const path = require('path')
const { folderWalker } = require('./utils/walk')

async function run () {
  const targetPath = path.resolve(__dirname, 'snapshots')
  const res = await folderWalker(targetPath)
  console.log(res)
}

run()
