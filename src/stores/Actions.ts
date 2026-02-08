import type { WidgetModel, WidgetType } from '../core/models/WidgetModel'
import { currentPage, selectedComponent } from './Selectors'
import { editorState } from './State'
import { WidgetFactory } from '../core/node_factory/WidgetFactory'

/**
 * Creates and adds a new widget to the current page.
 */
export function addWidget(type: WidgetType) {
  const create = WidgetFactory[type]
  if (!create) throw new Error(`Unknown widget type: ${type}`)

  const widget = create() // ← NOUVEAU widget à chaque appel

  currentPage.value?.widgets.push(widget)
  editorState.selectedComponentId = widget.id
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
  const node = currentPage.value?.widgets.find((w) => w.id === id)
  if (node) Object.assign(node.props, props)
}

/**
 * Updates the position and/or size of a component.
 */
export function updateComponentBounds(
  id: string,
  bounds: Partial<Pick<WidgetModel, 'x' | 'y' | 'width' | 'height'>>,
) {
  const node = currentPage.value?.widgets.find((w) => w.id === id)
  if (node) Object.assign(node, bounds)
}

/**
 * Deletes the selected component.
 */
export function deleteSelectedComponent() {
  const selected = selectedComponent.value
  const page = currentPage.value

  if (!selected || !page) return

  const index = page.widgets.findIndex((w) => w.id === selected.id)

  if (index !== -1) {
    page.widgets.splice(index, 1)
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
  const node = currentPage.value?.widgets.find((w) => w.id === nodeId)
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

  const node = currentPage.value?.widgets.find((w) => w.id === editorState.dragState.targetId)
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

export function startResize(
  nodeId: string,
  direction: 'right' | 'bottom' | 'corner',
  mouseX: number,
  mouseY: number,
) {
  const node = currentPage.value?.widgets.find((w) => w.id === nodeId)
  if (!node) return

  editorState.resizeState.isResizing = true
  editorState.resizeState.direction = direction
  editorState.resizeState.targetId = nodeId
  editorState.resizeState.startMouseX = mouseX
  editorState.resizeState.startMouseY = mouseY
  editorState.resizeState.startWidth = node.width
  editorState.resizeState.startHeight = node.height
  editorState.resizeState.startX = node.x
  editorState.resizeState.startY = node.y
}

export function resizeTo(mouseX: number, mouseY: number) {
  const rs = editorState.resizeState
  if (!rs.isResizing) return

  const node = currentPage.value?.widgets.find((w) => w.id === rs.targetId)
  if (!node) return

  const dx = mouseX - rs.startMouseX
  const dy = mouseY - rs.startMouseY

  if (rs.direction === 'right' || rs.direction === 'corner') {
    node.width = Math.max(20, rs.startWidth + dx)
  }

  if (rs.direction === 'bottom' || rs.direction === 'corner') {
    node.height = Math.max(20, rs.startHeight + dy)
  }
}

export function stopResize() {
  editorState.resizeState.isResizing = false
  editorState.resizeState.direction = null
  editorState.resizeState.targetId = null
}
