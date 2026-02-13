import type { VisualNodeModel } from './VisualNodeModel'

export type WidgetType = 'text' | 'image'

export interface WidgetModel extends VisualNodeModel {
  type: WidgetType
  x: number
  y: number
  props: Record<string, unknown>
}
