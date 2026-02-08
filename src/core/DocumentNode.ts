import type { PageModel } from './models/PageModel'
import type { DocumentModel } from './models/DocumentModel'
import type { NodeFactory } from './node_factory/NodeFactory'
import { PageNode } from './PageNode'

export class DocumentNode implements NodeFactory {
  private doc: DocumentModel

  constructor() {
    this.doc = this.createNode()
  }

  createNode(): DocumentModel {
    return {
      id: crypto.randomUUID(),
      pages: [new PageNode().createNode()],
    }
  }

  addPage(newPage: PageModel) {
    this.doc.pages.push(newPage)
  }

  deletePage(pageId: string) {
    const pageToDelete = this.doc.pages.find((p) => p.id === pageId)
    if (!pageToDelete) return

    this.doc.pages = this.doc.pages.filter((p) => p !== pageToDelete)
  }
}
