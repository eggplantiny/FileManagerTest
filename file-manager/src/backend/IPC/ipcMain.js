import { ipcMain, nativeImage  } from 'electron'
import { folderWalker } from '../utils/walk'

ipcMain.handle('read-file-list', (event, args = {}) => {

  const filePath = args.filePath || 'D:\\dev\\workspace\\fileManagerTest\\snapshots'
  const fileList = folderWalker(filePath)

  return fileList
})

ipcMain.handle('read-image', (event, args = {}) => {
  const path = '' + args.path

  console.log(path)

  if (!path) {
    return null
  }

  return nativeImage.createFromPath(path)
})
