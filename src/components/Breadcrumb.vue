<template>
  <div @click="select" class="breadcrumb">
    {{ entry }}
  </div>
</template>

<script>
  export default {
    props: ['entry', 'index'],
    methods: {
      select () {
        this.$emit('select')
      }
    }
  }
</script>
