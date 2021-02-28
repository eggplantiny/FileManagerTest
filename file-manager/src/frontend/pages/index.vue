<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-list
        >
          <template
            v-for="(item, index) in targetItemList"
          >
            <v-list-item
              :key="index"
              @click="onClickItem(item)"
            >
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
      <v-col cols="9">
        <v-row>
          <template
            v-for="(snapshot, index) in snapshotList"
          >
            <v-col
              cols="9"
              :key="index"
            >
              <v-img
                :src="snapshot"
              >
              </v-img>
            </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
          v-model="page"
          :length="pageLength"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ipcRenderer } from 'electron'

const ITEM_PER_PAGE = 30
const SNAPSHOT_FOLDER = 'D:\\dev\\workspace\\fileManagerTest\\snapshots'

export default {
  name: 'Home',
  data () {
    return {
      itemList: [],
      page: 0,
      targetItem: '',
      snapshotList: []
    }
  },
  computed: {
    targetItemList () {
      const { itemList, page } = this
      return itemList.slice(page * ITEM_PER_PAGE, page * ITEM_PER_PAGE + ITEM_PER_PAGE)
    },
    pageLength () {
      const { itemList } = this
      return Math.floor(itemList.length / ITEM_PER_PAGE)
    },
    targetFolder () {
      const { targetItem } = this
      if (targetItem.length === 0) {
        return null
      }

      return `${SNAPSHOT_FOLDER}\\${targetItem}`
    }
  },
  methods: {
    onClickItem (item) {
      this.targetItem = item
      this.fetchTargetSnapshotList()
    },
    async fetchTargetSnapshotList () {
      const { targetFolder } = this
      const snapshotList = await ipcRenderer.invoke('read-file-list', {
        filePath: targetFolder
      })
      this.snapshotList = await Promise.all(snapshotList.map(async fileName => {
        const path = `${targetFolder}\\${fileName}`
        return ipcRenderer.invoke('read-image', { path })
      }))
    }
  },
  async mounted () {
    const fileList = await ipcRenderer.invoke('read-file-list')
    this.itemList.push(...fileList)
  }
}
</script>

<style scoped>

</style>
