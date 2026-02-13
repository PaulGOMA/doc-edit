<script setup lang="ts">
import { computed } from 'vue'
import EditorCanvas from './workspace/EditorCanvas.vue'
import ToolBarCanvas from './workspace/ToolBarCanvas.vue'
import { selectedComponent } from '../stores/Selectors'
import ToolBarAssistant from './assistants/ToolBarAssistant.vue'

const activeComponent = computed(() => selectedComponent.value)
</script>

<template>
  <ToolBarCanvas class="tool-bar-section" />
  <div class="assistant-wrapper" v-if="activeComponent">
    <ToolBarAssistant
      v-if="activeComponent"
      :type="activeComponent.type"
      class=".toolbar-assistant-container"
    />
  </div>
  <EditorCanvas :style="activeComponent === null ? 'padding-top: 7rem' : 'padding-top: 9.5rem'" />
</template>

<style lang="css">
.tool-bar-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
}

.assistant-wrapper {
  display: flex;
  justify-content: center; /* centre horizontalement */
  width: 100%;
  position: relative;
  z-index: 1500;
}

.toolbar-assistant-container {
  position: fixed;
  top: 6rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
</style>
