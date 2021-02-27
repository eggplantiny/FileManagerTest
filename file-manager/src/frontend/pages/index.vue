<template>
  <v-row>
    <v-col cols="12">
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
    <v-col cols="12">
      <v-pagination
        v-model="page"
        :length="pageLength"
      />
    </v-col>
  </v-row>
</template>

<script>
import { ipcRenderer } from 'electron'

const ITEM_PER_PAGE = 30

export default {
  name: 'Home',
  data () {
    return {
      itemList: [],
      page: 0
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
    }
  },
  methods: {
    onClickItem (item) {
      console.log(item)
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
