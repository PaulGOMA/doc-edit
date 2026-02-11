<script setup lang="ts">
import { Button, InputNumber, Select } from 'primevue'
import { ref, computed, watch } from 'vue'
import { FONT_FAMILIES } from '../../../utils/FontFamilyList'
import { selectedComponent } from '../../../stores/Selectors'
import { updateComponentProps } from '../../../stores/Actions'
import type { TextWidgetModel } from '../../../core/models/TextWidgetModel'
import ColorPopOver from './ColorPopOver.vue'

const fontSize = ref(12)
const selectedFontFamily = ref()
const fontFamilies = ref(FONT_FAMILIES)
const selectedTextComponent = computed(() =>
  selectedComponent.value?.type === 'text' ? (selectedComponent.value as TextWidgetModel) : null,
)

const alignments = ['left', 'center', 'right', 'justify'] as const
const currentAlign = computed(() => {
  if (!selectedTextComponent.value) return 'left'
  return selectedTextComponent.value.props.textAlign
})

const alignIcon = computed(() => {
  switch (currentAlign.value) {
    case 'center':
      return 'pi pi-align-center'
    case 'right':
      return 'pi pi-align-right'
    case 'justify':
      return 'pi pi-align-justify'
    default:
      return 'pi pi-align-left'
  }
})

watch(
  () => selectedTextComponent.value,
  (node) => {
    if (!node) return
    const textNode = node as TextWidgetModel
    fontSize.value = textNode.props.fontSize
    selectedFontFamily.value = textNode.props.fontFamily
  },
  { immediate: true },
)

watch(selectedFontFamily, (value) => {
  if (!selectedTextComponent.value) return
  updateComponentProps(selectedTextComponent.value.id, { fontFamily: value })
})

watch(fontSize, (value) => {
  if (!selectedTextComponent.value) return
  updateComponentProps(selectedTextComponent.value.id, { fontSize: value })
})

function toggleBold() {
  if (!selectedTextComponent.value) return
  const isBold = selectedTextComponent.value.props.fontWeight === 'bold'
  updateComponentProps(selectedTextComponent.value.id, {
    fontWeight: isBold ? 'normal' : 'bold',
  })
}

function toggleItalic() {
  if (!selectedTextComponent.value) return
  const isItalic = selectedTextComponent.value.props.fontStyle === 'italic'
  updateComponentProps(selectedTextComponent.value.id, {
    fontStyle: isItalic ? 'normal' : 'italic',
  })
}

function toggleAlign() {
  if (!selectedTextComponent.value) return
  const index = alignments.indexOf(currentAlign.value)
  const next = alignments[(index + 1) % alignments.length]
  updateComponentProps(selectedTextComponent.value.id, { textAlign: next })
}

function toggleDecoration() {
  if (!selectedTextComponent.value) return
  const isUnderlined = selectedTextComponent.value.props.textDecoration === 'none'
  updateComponentProps(selectedTextComponent.value.id, {
    textDecoration: isUnderlined ? 'underline' : 'none',
  })
}
</script>

<template>
  <section class="text-assistant-section">
    <Select
      v-model="selectedFontFamily"
      :options="fontFamilies"
      option-label="label"
      option-value="value"
      :placeholder="FONT_FAMILIES[0]?.label"
    />
    <InputNumber show-buttons :step="1" fluid v-model="fontSize" />
    <ColorPopOver />
    <Button aria-label="text-bold-button" label="B" variant="text" @click="toggleBold" />
    <Button aria-label="text-italic-button" label="I" variant="text" @click="toggleItalic" />
    <Button
      label="S"
      aria-label="text-underlined-button"
      variant="text"
      @click="toggleDecoration"
    />
    <Button
      :icon="alignIcon"
      aria-label="text-underlined-button"
      variant="text"
      @click="toggleAlign"
    />
  </section>
</template>

<style lang="css">
.text-assistant-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: fit-content;
  height: fit-content;
  margin: 0.5rem;
  padding: 0;
}

.text-assistant-section .p-inputnumber {
  width: 5.5rem;
}

/* Select de police */
.text-assistant-section .p-select {
  width: 12.5rem;
}
</style>
