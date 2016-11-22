<style lang="scss" scoped>
  .vue-explorer {
    background: white;
    padding: 10px;
    font-family: sans-serif;
    box-sizing: border-box;
  }

  .entries {
    max-height: 500px;
    overflow-y: scroll;
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
    <div class="entries" v-if="entries !== null">
      <Entry v-for="entry in entries" :path="path" :entry="entry"></Entry>
    </div>
  </div>
</template>

<script>
  import Main from '../Main'
  import Entry from './Entry'
  import Breadcrumbs from './Breadcrumbs'

  export default {
    props: ['type'],
    data () {
      return {
        path: ['Users', 'paulmohr', 'Desktop'],
        entries: null
      }
    },
    created () {
      Main.$on('setPath', path => {
        this.path = path
      })
      Main.$on('selectFile', file => {
        console.log('Selected ' + file)
        this.$emit('select', file)
      })
      this.$watch('path', () => {
        this.loadFiles()
      })
      this.loadFiles()
    },
    methods: {
      loadFiles () {
        console.log('Type: ' + this.type)
        Main.types[this.type].list('/' + this.path.join('/')).then((files) => {
          this.entries = files
        }, (err) => {
          console.log(err)
        })
      }
    },
    components: {
      Entry,
      Breadcrumbs
    }
  }
</script>
