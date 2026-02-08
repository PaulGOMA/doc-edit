import { computed } from 'vue'
import { editorState } from './State'

/**
 * Returns the currently active page.
 */
export const currentPage = computed(() => {
  return editorState.document.pages[editorState.activePageIndex]
})

/**
 * Returns the component currently selected on the active page.
 */
export const selectedComponent = computed(() => {
  return currentPage.value?.widgets.find((w) => w.id === editorState.selectedComponentId) || null
})

/**
 * Returns all components on the active page.
 */
export const componentsOnPage = computed(() => {
  return currentPage.value?.widgets ?? []
})

/**
 * Returns true if a component is selected.
 */
export const hasSelection = computed(() => {
  return selectedComponent.value !== null
})
