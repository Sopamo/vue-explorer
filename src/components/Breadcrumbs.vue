<style lang="scss" scoped>
.breadcrumbs {
    padding: 10px;
    border-bottom: 1px solid #E5E9EA;
}

.breadcrumb {
    display: inline-block;
    margin-left: 15px;
    position: relative;
    color: #1BAAE5;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }

    &.last {
        color: #545F65;
        cursor: default;
        pointer-events: none;
    }
    &:before {
        content: '›';
        font-size: 22px;
        position: absolute;
        top: -6px;
        left: -14px;
        font-family: Courier, monospace;
    }
    &:first-child {
        margin-left: 0;
        &:before {
            display: none;
        }
    }
}

.items {
    display: inline-block;
}

.action-item {
    vertical-align: -7px;
    margin-right: 5px;
    cursor: pointer;
    color: blue;

    #outline {
      stroke: #CCD3D5;
    }
    &:hover #outline {
        stroke: #545F65;
    }
}
</style>

<template>
<div class="breadcrumbs">
  <svg @click="up" class="action-item" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="27.958px" height="27.958px" viewBox="0 0 27.958 27.958" enable-background="new 0 0 27.958 27.958" xml:space="preserve">
    <g>
      <linearGradient id="bg" gradientUnits="userSpaceOnUse" x1="14.5" y1="26.4585" x2="14.5" y2="0.4585">
        <stop offset="0" style="stop-color:#F7F7F7"/>
        <stop offset="1" style="stop-color:#FFFFFF"/>
      </linearGradient>
      <path fill="url(#bg)" d="M1.5,24.458c0,1.104,0.896,2,2,2h22c1.104,0,2-0.896,2-2v-22c0-1.104-0.896-2-2-2h-22
        c-1.104,0-2,0.896-2,2V24.458z"/>
      <path id="outline" fill="none" stroke="#CCD3D5" stroke-miterlimit="10" d="M27,2.958c0-1.104-0.896-2-2-2H3c-1.104,0-2,0.896-2,2v22
        c0,1.104,0.896,2,2,2h22c1.104,0,2-0.896,2-2V2.958z"/>
    </g>
    <polyline stroke="#889399" fill="none" stroke-miterlimit="10" points="19.656,16.552 14.594,11.052 8.844,16.552 "/>
  </svg>
  <div class="items">
    <Breadcrumb @select="goTo(index)" :class="{last: index === path.length - 1}" v-for="(entry, index) in path" :entry="entry" :index="index"></Breadcrumb>
  </div>
</div>
</template>

<script>
  import EventBus from '../EventBus'
  import Breadcrumb from './Breadcrumb'
  export default {
    props: ['path'],
    methods: {
      up () {
        let path = JSON.parse(JSON.stringify(this.path))
        if (!path.length) {
          return
        }
        path.pop()
        EventBus.$emit('setPath', path)
      },
      goTo (index) {
        console.log(index)
        let path = JSON.parse(JSON.stringify(this.path))
        path = path.slice(0, index + 1)
        EventBus.$emit('setPath', path)
      }
    },
    components: {
      Breadcrumb
    }
  }
</script>
