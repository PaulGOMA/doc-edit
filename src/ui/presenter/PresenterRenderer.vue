<script setup lang="ts">
import type { WidgetModel } from '../../core/models/WidgetModel'
import type { TextWidgetModel } from '../../core/models/TextWidgetModel'
import type { ImageWidgetModel } from '../../core/models/ImageWidgetModel'

import TextComponent from '../components/TextComponent.vue'
import ImageComponent from '../components/ImageComponent.vue'

const props = defineProps<{
  node: WidgetModel
  isEditing: boolean
  onStartEdit: () => void
  onStopEdit: () => void
}>()
</script>

<template>
  <TextComponent
    v-if="node.type === 'text'"
    :node="node as TextWidgetModel"
    :isEditing="isEditing"
    @startEdit="onStartEdit"
    @stopEdit="onStopEdit"
  />

  <ImageComponent
    v-else-if="node.type === 'image'"
    :node="node as ImageWidgetModel"
    :isEditing="isEditing"
    @startEdit="onStartEdit"
    @stopEdit="onStopEdit"
  />
</template>
