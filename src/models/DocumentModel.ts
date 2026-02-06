import { createPageModel, type PageModel } from './PageModel'
export { createPageModel } from './PageModel'

export interface DocumentModel {
  id: string
  pages: PageModel[]
}

export function createDocumentModel(): DocumentModel {
  return {
    id: crypto.randomUUID(),
    pages: [createPageModel()],
  }
}
