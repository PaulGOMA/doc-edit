<script setup lang="ts">
import type { WidgetModel } from '../../core/models/WidgetModel'
import { editorStore } from '../../stores'

import NodeComponent from '../components/NodeComponent.vue'
import TextComponent from '../components/TextComponent.vue'
import ImageComponent from '../components/ImageComponent.vue' // futur widget

const { currentPage, selectComponent } = editorStore

function resolvePresenter(node: WidgetModel) {
  switch (node.type) {
    case 'text':
      return TextComponent
    case 'image':
      return ImageComponent
    default:
      return null
  }
}
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
      <!-- Render all widgets -->
      <NodeComponent
        v-for="node in currentPage.widgets"
        :key="node.id"
        :widget="node"
        @click.stop="selectComponent(node.id)"
      >
        <template #default="{ isEditing, enableEdit, disableEdit }">
          <component
            :is="resolvePresenter(node)"
            :node="node"
            :isEditing="isEditing"
            @startEdit="enableEdit"
            @stopEdit="disableEdit"
          />
        </template>
      </NodeComponent>
    </div>
  </div>
</template>

<style scoped>
.canvas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
}

.page {
  position: relative;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
