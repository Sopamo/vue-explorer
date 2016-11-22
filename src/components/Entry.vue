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
  <div class="entry" v-on:dblclick="handleSelect">
    <div class="part"><img class="icon" :src="icon">{{ entry.name }}</div>
  </div>
</template>

<script>
  import EventBus from '../EventBus'

  var folder = require('../images/folder.svg')
  var file = require('../images/file.svg')

  export default {
    props: ['entry', 'path'],
    methods: {
      handleSelect () {
        EventBus.$emit('selectFile', '/' + this.path.join('/') + '/' + this.entry.name)
      }
    },
    computed: {
      icon () {
        if (this.entry.type === 'folder') {
          return folder
        }
        return file
      }
    }
  }
</script>
