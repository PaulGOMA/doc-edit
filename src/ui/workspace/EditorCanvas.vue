<script setup lang="ts">
import type { WidgetModel } from '../../core/models/WidgetModel'
import { editorStore } from '../../stores'
import TextAssistant from '../assistants/text/TextAssistant.vue'
import ToolBarAssistant from '../assistants/ToolBarAssistant.vue'
import TextComponent from '../components/TextComponent.vue'
import { selectedComponent } from '../../stores/Selectors'

import { computed } from 'vue'

const { currentPage, selectComponent } = editorStore

const isTextComponentSelected = computed(() => selectedComponent.value?.type === 'text')
</script>

<template>
  <div class="canvas">
    <tool-bar-assistant>
      <template v-if="isTextComponentSelected">
        <text-assistant />
      </template>
    </tool-bar-assistant>
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
        v-for="node in currentPage.widgets"
        :key="node.id"
        :is="resolveComponent(node)"
        :node="node as any"
        @click.stop="selectComponent(node.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
function resolveComponent(node: WidgetModel) {
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
