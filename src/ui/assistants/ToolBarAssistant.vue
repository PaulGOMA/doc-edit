<script setup lang="ts">
import type { Component } from 'vue'
import type { WidgetType } from '../../core/models/WidgetModel'
import TextAssistant from './text/TextAssistant.vue'
import ImageAssistant from './ImageAssistant.vue'

const props = defineProps<{ type: WidgetType }>()

const assistant: Record<WidgetType, Component> = {
  text: TextAssistant,
  image: ImageAssistant,
}
</script>

<template>
  <div class="toolbar-assistant-container">
    <component :is="assistant[props.type]" />
  </div>
</template>

<style lang="css">
.toolbar-assistant-container {
  width: fit-content;
  min-height: 2rem;
  max-height: fit-content;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1.25px solid #e2e8f0;
  border-radius: 5px;
}
</style>
