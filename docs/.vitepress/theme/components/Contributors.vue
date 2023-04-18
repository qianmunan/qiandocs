<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const defaultAuthor = 'qiananran'
const { frontmatter } = useData()

const contributorsArr = [frontmatter.value?.author, ...frontmatter.value.contributors || []].filter(x => x)
const contributors = ref(contributorsArr)

const reName = (name: string) => name === 'qiananran' ? 'qiananran' : name

const getAvatarUrl = (name: string) => `https://github.com/qiananran.png`
const getGithubLink = (name: string) => `https://github.com/qiananran`

const isNotEmpty = (arr: string | string[]) => Array.isArray(arr) && arr.length
</script>

<template>
  <div v-if="isNotEmpty(contributors)" class="flex flex-wrap gap-4">
    <div v-for="contributor of contributors" :key="contributor" class="flex gap-2 items-center">
      <a :href="getGithubLink(contributor)" rel="noreferrer" target="_blank">
        <img :src="getAvatarUrl(contributor)" class="w-8 h-8 rounded-full">
      </a>
      {{ contributor }}
    </div>
  </div>
  <div v-else class="flex gap-2 items-center">
    <a :href="getGithubLink(defaultAuthor)" rel="noreferrer" target="_blank">
      <img :src="getAvatarUrl(defaultAuthor)" class="w-8 h-8 rounded-full">
    </a>
    {{ '小锅盖儿' }}
  </div>
</template>
