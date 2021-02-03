const path = require('path')
const { walkDirectories } = require('./utils/walk')
const { takeSnapshot } = require('./utils/snapshot')
const targetPath = path.resolve('D:/download/torrent')

// walkDirectories(targetPath)
//   .then(files => console.log(files))
//   .catch(error => console.error(error))

async function run () {
    const startDate = new Date()
    console.log(`start at ${startDate}`)

    console.log(`start scan ${targetPath} folder`)
    const statList = await walkDirectories(targetPath)
    const allCount = statList.length
    console.log(`find all of ${allCount} files`)

    let c = 0
    let success = 0
    let failure = 0
    for await (const stat of statList) {
        const { name, path } = stat
        c += 1

        console.log(`[${c}/${allCount}] taking ${name} snapshots on ${path}`)
        try {
            await takeSnapshot(name, path)
            success += 1
        } catch (e) {
            failure += 1
            console.error(e)
        }
    }

    const endDate = new Date()
    console.log(`complete script at ${endDate}`)
    console.log(`success ${success} files and failed ${failure} files on ${allCount} files`)
}

run()
