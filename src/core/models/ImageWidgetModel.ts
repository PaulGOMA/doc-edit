import type { WidgetModel } from './WidgetModel'

export interface ImageWidgetModel extends WidgetModel {
  type: 'image'
  props: {
    source: string | null
    alt: string
    scaleMode: 'fit' | 'fill' | 'stretch' | 'none'
  }
}
