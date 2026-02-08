import type { NodeModel } from './NodeModel'
import type { PageModel } from './PageModel'

export interface DocumentModel extends NodeModel {
  pages: PageModel[]
}
