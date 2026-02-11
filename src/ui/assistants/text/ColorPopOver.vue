<script setup lang="ts">
import { Button, ColorPicker, InputText, Popover } from 'primevue'
import { computed, ref, watch } from 'vue'
import { selectedComponent } from '../../../stores/Selectors'
import type { TextWidgetModel } from '../../../core/models/TextWidgetModel'
import { updateComponentProps } from '../../../stores/Actions'

const color = ref('#000000')
const colorPopover = ref()
const selectedTextComponent = computed(() =>
  selectedComponent.value?.type === 'text' ? (selectedComponent.value as TextWidgetModel) : null,
)

function toggle(event: Event) {
  colorPopover.value.toggle(event)
}

function normalizeHex(value: string) {
  let hex = value.replace('#', '').toLowerCase()

  // si format court (#f0a) → étendre
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }

  return `#${hex}`
}

watch(color, (value) => {
  if (!selectedTextComponent.value) return
  const hex = normalizeHex(value)
  color.value = hex
  updateComponentProps(selectedTextComponent.value.id, { color: hex })
})
</script>

<template>
  <Button aria-label="text-color-button" label="A" variant="text" @click="toggle" />
  <Popover ref="colorPopover" class="pop-over-container">
    <InputText size="small" type="text" v-model="color" />
    <ColorPicker v-model="color" inline class="color-picker-frame" format="hex" />
  </Popover>
</template>

<style lang="css">
.p-popover-content {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem;
  width: min-content;
  height: auto;
}

.color-picker-frame {
  width: 100%;
}

.pop-over-container input {
  width: 100%;
}
</style>
