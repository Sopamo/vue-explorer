import Vue from 'vue'
const main = new Vue()
main.types = {}
main.use = function (plugin) {
  main.types[plugin.type] = plugin
}
main.data = () => {
  return {
    selectedFile: ''
  }
}

import local from './types/local'

main.use(local)

main.$on('selectFile', (file) => {
  main.selectedFile = file
})

export default main
