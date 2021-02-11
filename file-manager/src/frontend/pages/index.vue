<template>
  <v-row>
    <v-col cols="12">
      Hello World
    </v-col>
    <v-col cols="12">
      <v-btn @click="readFileList">
        Load File List
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Home',
  methods: {
    async readFileList () {
      const asd = await ipcRenderer.invoke('read-file-list')
      console.log(asd)
    }
  }
}
</script>

<style scoped>

</style>
