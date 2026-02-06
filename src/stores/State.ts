import { reactive } from 'vue'
import { createDocumentModel } from '../models/DocumentModel'

export const editorState = reactive({
  document: createDocumentModel(),
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
})
