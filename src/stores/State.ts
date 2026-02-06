import { reactive } from 'vue'
import { createDocumentModel } from '../models/DocumentModel'

export const editorState = reactive({
  document: createDocumentModel(),
  selectedComponentId: null as string | null,
  activePageIndex: 0,
  activeAssistant: 'none' as 'none' | 'insert' | 'edit',
})
