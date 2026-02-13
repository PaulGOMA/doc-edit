<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { ImageWidgetModel } from '../../core/models/ImageWidgetModel'
import { updateComponentProps } from '../../stores/Actions'
import type { CSSProperties } from 'vue'

const props = defineProps<{
  node: ImageWidgetModel
  isEditing: boolean
}>()

const emit = defineEmits(['startEdit', 'stopEdit'])

const fileInput = ref<HTMLInputElement | null>(null)

/* ---------- DOUBLE-CLICK → EDIT (remplacer l’image) ---------- */
function onDbClick() {
  emit('startEdit')

  nextTick(() => {
    fileInput.value?.click()
  })
}

/* ---------- FILE SELECTED ---------- */
function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) {
    emit('stopEdit')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    updateComponentProps(props.node.id, {
      source: reader.result as string,
    })
    emit('stopEdit')
  }
  reader.readAsDataURL(file)
}

/* ---------- SCALE MODE CSS ---------- */
const scaleModeStyle = {
  fit: 'contain',
  fill: 'cover',
  stretch: '100% 100%',
  none: 'auto',
}
</script>

<template>
  <div
    class="image-content"
    @dblclick.stop="onDbClick"
    :style="{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    <img
      v-if="node.props.source"
      :src="node.props.source"
      :alt="node.props.alt"
      class="image-element"
      :style="
        {
          width: node.props.scaleMode === 'stretch' ? '100%' : 'auto',
          height: node.props.scaleMode === 'stretch' ? '100%' : 'auto',
          objectFit:
            node.props.scaleMode === 'stretch' ? 'fill' : scaleModeStyle[node.props.scaleMode],
        } as CSSProperties
      "
    />

    <!-- Input invisible pour remplacer l’image -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none"
      @change="onFileChange"
    />
  </div>
</template>

<style scoped>
.image-content {
  position: relative;
}

.image-element {
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  pointer-events: none; /* important pour laisser NodeComponent gérer le drag */
}
</style>
