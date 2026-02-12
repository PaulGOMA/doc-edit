<script setup lang="ts">
import { ref, computed } from 'vue'
import { selectedComponent } from '../../stores/Selectors'
import {
  dragTo,
  selectComponent,
  startDrag,
  startResize,
  stopDrag,
  stopResize,
  resizeTo,
} from '../../stores/Actions'
import type { WidgetModel } from '../../core/models/WidgetModel'

const props = defineProps<{ widget: WidgetModel }>()

const isSelected = computed(() => props.widget.id === selectedComponent.value?.id)
const isEditing = ref(false)

function enableEdit() {
  isEditing.value = true
}

function disableEdit() {
  isEditing.value = false
}

/* ---------- DRAG ---------- */
function onMouseDown(e: MouseEvent) {
  if (isEditing.value) return
  selectComponent(props.widget.id)
  startDrag(props.widget.id, e.clientX, e.clientY)
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
  startResize(props.widget.id, direction, e.clientX, e.clientY)
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
</script>
<template>
  <div
    class="node-container"
    :class="{ selected: isSelected }"
    @mousedown="onMouseDown"
    :style="{
      position: 'absolute',
      left: widget.x + 'px',
      top: widget.y + 'px',
      width: widget.width + 'px',
      height: widget.height + 'px',
    }"
  >
    <!-- Contenu du widget -->
    <div class="node-content">
      <slot :isEditing="isEditing" :enableEdit="enableEdit" :disableEdit="disableEdit" />
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
.node-container {
  position: absolute;
  box-sizing: border-box;
}

.node-container.selected {
  border: 2px dashed #3b82f6;
  background: rgba(255, 255, 0, 0.15);
  border-radius: 4px;
}

.node-content {
  width: 100%;
  height: 100%;
  position: relative;
}

/* handles identiques à avant */
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
