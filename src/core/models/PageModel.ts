import type { VisualNodeModel } from './VisualNodeModel'
import type { WidgetModel } from './WidgetModel'

export interface PageModel extends VisualNodeModel {
  name?: string
  color: string
  widgets: WidgetModel[]
}
