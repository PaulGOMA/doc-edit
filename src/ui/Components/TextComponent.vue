<script setup lang="ts">
import type { TextNode } from '../../models/TextNode'
import { computed, ref, watch } from 'vue'
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

const props = defineProps<{
  node: TextNode
}>()

const isSelected = computed(() => props.node.id === selectedComponent.value?.id)

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const mirrorRef = ref<HTMLDivElement | null>(null)

function onMouseMove(e: MouseEvent) {
  dragTo(e.clientX, e.clientY)
}

function onMouseUp() {
  stopDrag()

  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

function onMouseDown(e: MouseEvent) {
  selectComponent(props.node.id)
  startDrag(props.node.id, e.clientX, e.clientY)

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onResizeStart(direction: 'right' | 'bottom' | 'corner', e: MouseEvent) {
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

const isEditing = ref(false)

function onDbClick() {
  isEditing.value = true
}

const editatableText = ref(props.node.props.text)
const minWidth = 20

function onEdit() {
  isEditing.value = false
  updateComponentProps(props.node.id, {
    text: editatableText.value,
    height: textareaRef.value?.scrollHeight || props.node.height,
    width:
      mirrorRef.value?.offsetWidth === undefined
        ? props.node.width
        : Math.max(minWidth, mirrorRef.value?.offsetWidth + 4),
  })
}

function autoResize() {
  const el = textareaRef.value
  const mirror = mirrorRef.value
  if (!el || !mirror) return

  // vertical
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'

  // horizontal
  const newWidth = Math.max(minWidth, mirror.offsetWidth + 4)
  el.style.width = newWidth + 'px'

  // mettre à jour le container en direct
  props.node.width = newWidth
}

watch(
  () => props.node.props.text,
  (newValue) => {
    if (!isEditing.value) {
      editatableText.value = newValue
    }
  },
)
</script>

<template>
  <div
    class="text-node"
    :class="{ selected: isSelected }"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @dblclick="onDbClick"
    :style="{
      position: 'absolute',
      left: node.x + 'px',
      top: node.y + 'px',
      width: node.width + 'px',
      height: isEditing ? 'auto' : node.height + 'px',
      fontSize: node.props.fontSize + 'px',
      fontWeight: node.props.fontWeight,
      fontStyle: node.props.fontStyle,
      fontFamily: node.props.fontFamily,
      lineHeight: node.props.lineHeight + 'px',
      textAlign: node.props.textAlign,
      color: node.props.color,
      cursor: 'pointer',
    }"
  >
    <!-- Edition mode -->
    <template v-if="isEditing">
      <textarea
        v-model="editatableText"
        @blur="onEdit"
        class="text-editor"
        ref="textareaRef"
        @input="autoResize"
      >
      </textarea>
      <div ref="mirrorRef" class="text-mirror">
        {{ editatableText }}
      </div>
    </template>

    <div v-else>{{ node.props.text }}</div>

    <!-- Handles for resizing -->
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
.text-node {
  cursor: pointer;
  border: 1px dashed #888;
  background: rgba(255, 255, 0, 0.2);
}

.selected {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  z-index: 10;
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

.text-editor {
  position: relative;
  width: auto;
  min-width: 1px;
  min-height: 1px;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  font: inherit;
  background: transparent;
  padding: 0;
}

.text-mirror {
  position: absolute;
  visibility: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
  font: inherit;
  line-height: inherit;
  padding: 0;
  width: auto;
  max-width: none;
}
</style>
