import { TextWidget } from '../widgets/TextWidget'
import type { WidgetType, WidgetModel } from '../models/WidgetModel'

export const WidgetFactory: Record<WidgetType, () => WidgetModel> = {
  text: () => new TextWidget().createNode(),
}
