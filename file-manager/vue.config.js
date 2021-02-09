const path = require('path')

module.exports = {
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'src/frontend/main.js',
      template: 'src/frontend/public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/frontend'),
        '~': path.join(__dirname, 'src/backend'),
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
      ]
    }
  },
  pluginOptions: {
    electronBuilder: {
      buildDependenciesFromSource: true,
      nodeIntegration: true,
      mainProcessFile: 'src/backend/background.js'
    }
  }
}
