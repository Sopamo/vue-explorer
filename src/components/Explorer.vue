<style lang="scss" scoped>
  .vue-explorer {
    background: white;
    padding: 10px;
    font-family: sans-serif;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    padding: 10px;
    border-bottom: 2px solid #E5E9EA;

    .item {
      color: #889399;
      width: 50%;
    }
  }
</style>

<template>
  <div class="vue-explorer">
    <Breadcrumbs :path="path"></Breadcrumbs>
    <div class="header">
      <div class="item">Name</div>
      <div class="item">Modified</div>
    </div>
    <div class="entries">
      <Entry v-for="entry in entries" :path="path" :entry="entry"></Entry>
    </div>
  </div>
</template>

<script>
  import EventBus from '../EventBus'
  import Entry from './Entry'
  import Breadcrumbs from './Breadcrumbs'

  export default {
    props: ['type'],
    data () {
      return {
        path: ['Users', 'paulmohr', 'Desktop', 'work'],
        entries: [
          {
            type: 'folder',
            name: 'Sales'
          },
          {
            type: 'folder',
            name: 'Customers'
          },
          {
            type: 'file',
            name: 'All the passwords'
          },
          {
            type: 'folder',
            name: 'Cat videos'
          },
          {
            type: 'file',
            name: 'Todo.txt'
          }
        ]
      }
    },
    created () {
      EventBus.$on('setPath', path => {
        this.path = path
      })
      EventBus.$on('selectFile', file => {
        console.log('Selected ' + file)
        this.$emit('select', file)
      })
    },
    components: {
      Entry,
      Breadcrumbs
    }
  }
</script>
