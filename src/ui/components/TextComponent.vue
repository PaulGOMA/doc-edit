<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import { selectedComponent } from '../../stores/Selectors'
import {
  dragTo,
  selectComponent,
  startDrag,
  startResize,
  stopDrag,
  stopResize,
  resizeTo,
  updateComponentProps,
} from '../../stores/Actions'
import type { TextWidgetModel } from '../../core/models/TextWidgetModel'

const props = defineProps<{ node: TextWidgetModel }>()

const isSelected = computed(() => props.node.id === selectedComponent.value?.id)
const isEditing = ref(false)
const editableText = ref(props.node.props.text)
const elementRef = ref<HTMLElement | null>(null)

/* ---------- DRAG ---------- */
function onMouseDown(e: MouseEvent) {
  if (isEditing.value) return
  selectComponent(props.node.id)
  startDrag(props.node.id, e.clientX, e.clientY)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e: MouseEvent) {
  if (isEditing.value) return
  dragTo(e.clientX, e.clientY)
}

function onMouseUp() {
  stopDrag()
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

/* ---------- RESIZE ---------- */
function onResizeStart(direction: 'right' | 'bottom' | 'corner', e: MouseEvent) {
  if (isEditing.value) return
  startResize(props.node.id, direction, e.clientX, e.clientY)
  window.addEventListener('mousemove', onResizeMove)
  window.addEventListener('mouseup', onResizeEnd)
}

function onResizeMove(e: MouseEvent) {
  resizeTo(e.clientX, e.clientY)
}

function onResizeEnd() {
  stopResize()
  window.removeEventListener('mousemove', onResizeMove)
  window.removeEventListener('mouseup', onResizeEnd)
}

/* ---------- EDITION ---------- */
function onDbClick() {
  isEditing.value = true
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

function onBlur() {
  const el = elementRef.value as HTMLTextAreaElement
  const newHeight = el?.scrollHeight || props.node.height

  isEditing.value = false

  updateComponentProps(props.node.id, {
    text: editableText.value,
    height: newHeight,
  })
}

function onInputResize() {
  const el = elementRef.value as HTMLTextAreaElement | null
  if (!el) return
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

/* ---------- SYNC ---------- */
watch(
  () => props.node.props.text,
  (v) => {
    if (!isEditing.value) editableText.value = v
  },
)
</script>

<template>
  <div
    class="text-node"
    :class="{ selected: isSelected }"
    @mousedown="onMouseDown"
    @dblclick="onDbClick"
    :style="{
      position: 'absolute',
      left: node.x + 'px',
      top: node.y + 'px',
      width: node.width + 'px',
      height: node.height + 'px',
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
    <textarea
      v-if="isEditing"
      ref="elementRef"
      v-model="editableText"
      class="text-inner"
      @input="onInputResize"
      @blur="onBlur"
    ></textarea>

    <div v-else ref="elementRef" class="text-inner">
      {{ editableText }}
    </div>

    <!-- Handles -->
    <div
      v-if="isSelected"
      class="resize-handle right"
      @mousedown.stop="onResizeStart('right', $event)"
    ></div>

    <div
      v-if="isSelected"
      class="resize-handle bottom"
      @mousedown.stop="onResizeStart('bottom', $event)"
    ></div>

    <div
      v-if="isSelected"
      class="resize-handle corner"
      @mousedown.stop="onResizeStart('corner', $event)"
    ></div>
  </div>
</template>

<style scoped>
/* --- MODE NORMAL --- */
.text-node {
  border: 1px dashed transparent;
  background: transparent;
  box-sizing: border-box;
}

/* --- MODE ÉDITION (englobe handles + texte) --- */
.text-node.selected {
  border: 2px dashed #3b82f6;
  background: rgba(255, 255, 0, 0.15);
  border-radius: 4px;
}

/* --- TEXTE (div + textarea) --- */
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

/* --- HANDLES --- */
.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 50%;
}

.resize-handle.right {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.resize-handle.bottom {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.resize-handle.corner {
  right: -6px;
  bottom: -6px;
  cursor: nwse-resize;
}
</style>
