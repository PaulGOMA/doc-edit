<script setup lang="ts">
import type { ComponentNode } from '../models/ComponentNode'
import { editorStore } from '../stores'
import TextComponent from './Components/TextComponent.vue'

const { currentPage, selectComponent } = editorStore
</script>

<template>
  <div class="canvas">
    <div
      v-if="currentPage"
      class="page"
      :style="{
        width: currentPage.width + 'px',
        height: currentPage.height + 'px',
      }"
    >
      <!-- Render all components -->
      <component
        v-for="node in currentPage.components"
        :key="node.id"
        :is="resolveComponent(node)"
        :node="node as any"
        @click.stop="selectComponent(node.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
function resolveComponent(node: ComponentNode) {
  switch (node.type) {
    case 'text':
      return TextComponent
    default:
      return null
  }
}
</script>

<style scoped>
.canvas {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f5f5f5;
}

.page {
  position: relative;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
