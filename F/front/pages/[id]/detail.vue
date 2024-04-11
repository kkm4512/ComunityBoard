<template>
  <div>
    {{ response }}
  </div>
</template>

<script setup lang="ts">
import { useBoardsDetailStore } from '~/stores/boardsDetail'
import type { responseBoard } from '~/types/boardtype';

const route = useRoute()
const boardsDetail = useBoardsDetailStore()
const response = await jwtDataFetch('board/getBoardsUserId',{id : route.params.id}) as responseBoard[]
boardsDetail.updateDetailBoards(response)

</script>

<style scoped>

</style>