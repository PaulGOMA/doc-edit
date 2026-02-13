import { TextWidget } from '../widgets/TextWidget'
import type { WidgetType, WidgetModel } from '../models/WidgetModel'
import { ImageWidget } from '../widgets/ImageWidget'

export const WidgetFactory: Record<WidgetType, (...args: any) => WidgetModel> = {
  text: () => new TextWidget().createNode(),
  image: (src: string) => new ImageWidget(src).createNode(),
}
