import { reactive } from 'vue'
import { DocumentNode } from '../core/DocumentNode'

export const editorState = reactive({
  document: new DocumentNode().createNode(),
  selectedComponentId: null as string | null,
  activePageIndex: 0,
  activeAssistant: 'none' as 'none' | 'insert' | 'edit',

  dragState: {
    isDragging: false,
    startMouseX: 0,
    startMouseY: 0,
    startX: 0,
    startY: 0,
    targetId: null as string | null,
  },

  resizeState: {
    isResizing: false,
    direction: null as 'right' | 'bottom' | 'corner' | null,
    startMouseX: 0,
    startMouseY: 0,
    startWidth: 0,
    startHeight: 0,
    startX: 0,
    startY: 0,
    targetId: null as string | null,
  },
})
