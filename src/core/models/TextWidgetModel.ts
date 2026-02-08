import type { WidgetModel } from './WidgetModel'

export interface TextWidgetModel extends WidgetModel {
  type: 'text'
  props: {
    text: string
    fontSize: number
    fontWeight: 'normal' | 'bold' | 'black' | number
    fontStyle: 'regular' | 'italic'
    fontFamily: string
    lineHeight: number
    textAlign: 'left' | 'center' | 'right' | 'justify'
    color: string
  }
}
