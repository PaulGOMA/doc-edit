import type { ComponentNode } from '../models/ComponentNode'
import type { ComponentType } from '../models/ComponentType'
import { createTextNode } from '../models/TextNode'
import { currentPage, selectedComponent } from './Selectors'
import { editorState } from './State'

/**
 * Creates and adds a new component to the current page.
 */
export function addComponent(type: ComponentType) {
  let node: ComponentNode | null = null

  switch (type) {
    case 'text':
      node = createTextNode()
      break

    default:
      console.warn(`Unsupported component type: ${type}`)
      return
  }

  currentPage.value?.components.push(node)
  editorState.selectedComponentId = node.id
  editorState.activeAssistant = 'edit'
}

/**
 * Selects a component by ID.
 */
export function selectComponent(id: string) {
  editorState.selectedComponentId = id
  editorState.activeAssistant = 'edit'
}

/**
 * Updates the props of a component.
 */
export function updateComponentProps(id: string, props: Record<string, unknown>) {
  const node = currentPage.value?.components.find((c) => c.id === id)
  if (node) Object.assign(node.props, props)
}

/**
 * Updates the position and/or size of a component.
 */
export function updateComponentBounds(
  id: string,
  bounds: Partial<Pick<ComponentNode, 'x' | 'y' | 'width' | 'height'>>,
) {
  const node = currentPage.value?.components.find((c) => c.id === id)
  if (node) Object.assign(node, bounds)
}

/**
 * Deletes the selected component.
 */
export function deleteSelectedComponent() {
  const selected = selectedComponent.value
  const page = currentPage.value

  if (!selected || !page) return

  const index = page.components.findIndex((c) => c.id === selected.id)

  if (index !== -1) {
    page.components.splice(index, 1)
  }

  editorState.selectedComponentId = null
  editorState.activeAssistant = 'none'
}

/**
 * Opens the insert assistant.
 */
export function openInsertAssistant() {
  editorState.activeAssistant = 'insert'
}

/**
 * Changes the active page.
 */
export function setActivePage(index: number) {
  if (index >= 0 && index < editorState.document.pages.length) {
    editorState.activePageIndex = index
    editorState.selectedComponentId = null
    editorState.activeAssistant = 'none'
  }
}

export function startDrag(nodeId: string, mouseX: number, mouseY: number) {
  const node = currentPage.value?.components.find((c) => c.id === nodeId)
  if (!node) return

  editorState.dragState.isDragging = true
  editorState.dragState.targetId = nodeId
  editorState.dragState.startMouseX = mouseX
  editorState.dragState.startMouseY = mouseY
  editorState.dragState.startX = node.x
  editorState.dragState.startY = node.y
}

export function dragTo(mouseX: number, mouseY: number) {
  if (!editorState.dragState.isDragging) return

  const node = currentPage.value?.components.find((c) => c.id === editorState.dragState.targetId)
  if (!node) return

  const dx = mouseX - editorState.dragState.startMouseX
  const dy = mouseY - editorState.dragState.startMouseY

  node.x = editorState.dragState.startX + dx
  node.y = editorState.dragState.startY + dy
}

export function stopDrag() {
  editorState.dragState.isDragging = false
  editorState.dragState.targetId = null
}
