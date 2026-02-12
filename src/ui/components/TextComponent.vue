<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { TextWidgetModel } from '../../core/models/TextWidgetModel'
import { updateComponentProps } from '../../stores/Actions'

const props = defineProps<{
  node: TextWidgetModel
  isEditing: boolean
}>()

const emit = defineEmits(['startEdit', 'stopEdit'])

const editableText = ref(props.node.props.text)
const elementRef = ref<HTMLElement | null>(null)

/* ---------- SYNC STORE → UI ---------- */
watch(
  () => props.node.props.text,
  (v) => {
    if (!props.isEditing) editableText.value = v
  },
)

/* ---------- DOUBLE-CLICK → EDIT ---------- */
function onDbClick() {
  emit('startEdit')
  editableText.value = props.node.props.text

  nextTick(() => {
    const el = elementRef.value as HTMLTextAreaElement
    if (el) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
      el.focus()
    }
  })
}

/* ---------- BLUR → SAVE ---------- */
function onBlur() {
  const el = elementRef.value as HTMLTextAreaElement
  const newHeight = el?.scrollHeight || props.node.height

  emit('stopEdit')

  updateComponentProps(props.node.id, {
    text: editableText.value,
    height: newHeight,
  })
}

/* ---------- AUTO-RESIZE ---------- */
function onInputResize() {
  const el = elementRef.value as HTMLTextAreaElement | null
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
</script>

<template>
  <div
    class="text-content"
    @dblclick.stop="onDbClick"
    :style="{
      width: '100%',
      height: '100%',
      fontSize: node.props.fontSize + 'px',
      fontWeight: node.props.fontWeight,
      fontStyle: node.props.fontStyle,
      fontFamily: node.props.fontFamily,
      lineHeight: 'normal',
      textAlign: node.props.textAlign,
      textDecoration: node.props.textDecoration,
      color: node.props.color,
    }"
  >
    <!-- MODE ÉDITION -->
    <textarea
      v-if="isEditing"
      ref="elementRef"
      v-model="editableText"
      class="text-inner edit"
      @input="onInputResize"
      @blur="onBlur"
    />

    <!-- MODE NORMAL -->
    <div v-else ref="elementRef" class="text-inner">
      {{ editableText }}
    </div>
  </div>
</template>

<style scoped>
.text-content {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Texte commun */
.text-inner {
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
  word-wrap: break-word;
  font: inherit;
  line-height: inherit;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  text-decoration: inherit;
}

/* Mode édition */
.text-inner.edit {
  width: 100%;
  height: auto;
  min-height: 100%;
  overflow: hidden;
}
</style>
