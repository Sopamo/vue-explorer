<style lang="scss" scoped>
  .entries {
    .entry {
      cursor: pointer;
      border-bottom: 1px solid #E5E9EA;
      padding: 10px;
      color: #545F65;

      &:hover {
        background: rgb(245, 246, 247);
      }

      .part .icon {
        width: 20px;
        display: inline-block;
        vertical-align: bottom;
        margin-right: 5px;
      }
    }
  }
</style>

<template>
  <div class="entry" :class="{active: isActive}" v-on:dblclick="handleGoInto" v-on:click="handleSelect">
    <div class="part"><img class="icon" :src="icon">{{ entry.name }}</div>
    <div class="part">{{ entry.modified }}</div>
  </div>
</template>

<script>
  import Main from '../Main'

  var folder = require('../images/folder.svg')
  var file = require('../images/file.svg')

  export default {
    props: ['entry', 'path'],
    methods: {
      handleSelect () {
        Main.$emit('selectFile', this.fullPath)
      },
      handleGoInto () {
        if (this.entry.type === 'folder') {
          let path = JSON.parse(JSON.stringify(this.path))
          path.push(this.entry.name)
          Main.$emit('setPath', path)
        } else {
          this.handleSelect()
        }
      }
    },
    computed: {
      icon () {
        if (this.entry.type === 'folder') {
          return folder
        }
        return file
      },
      fullPath () {
        return '/' + this.path.join('/') + '/' + this.entry.name
      },
      isActive () {
        return Main.activeFile === this.fullPath
      }
    }
  }
</script>
