<!-- Iframe -->
<template>
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86
        :src="mylink"></iframe>
</template>
 
<script setup lang="ts">
const props = defineProps<{
  mylink: string
}>()

const mylink = `${props.mylink}`
</script>
 
<style scoped>
/*隐藏 滚动条*/
::-webkit-scrollbar {
    display: none;
}

iframe {
    width: 100%;
    min-height: 100px;
}
</style>