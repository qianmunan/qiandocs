<script setup lang="ts">
import Icon from './Icon.vue';

const props = defineProps<{
  bvId: string
  mylink: string
}>()
const link = `https://www.bilibili.com/video/${props.bvId}/`
const mylink = `${props.mylink}`
</script>

<template>
  <div class="video_link">
    <a class="my_link" :href="mylink" target="_blank" bg-blue:10 px4 py3 rounded block mt2 flex items-center gap2>
      <Icon icon='ic:round-link' size='28' color=green></Icon>
      <slot />
    </a>
  </div>
</template>

<style>
.my_link{
    font-weight: 500;
    color: var(--vp-c-brand);
    text-decoration-style: dotted;
    background-color: #e8f3ff;
    transition: color 0.25s ease 0s;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    touch-action: manipulation;
    text-decoration: inherit;
}
</style>

