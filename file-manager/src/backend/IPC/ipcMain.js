import { ipcMain } from 'electron'
import { folderWalker } from '../utils/walk'

ipcMain.handle('read-file-list', (event, args = {}) => {

  const filePath = args.filePath || 'D:\\dev\\workspace\\fileManagerTest\\snapshots'
  const fileList = folderWalker(filePath)

  return fileList
})

