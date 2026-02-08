import type { PageModel } from './models/PageModel'
import type { WidgetModel } from './models/WidgetModel'
import type { NodeFactory } from './node_factory/NodeFactory'

export class PageNode implements NodeFactory {
  private page: PageModel

  constructor() {
    this.page = this.createNode()
  }

  createNode(name = 'Page 1'): PageModel {
    return {
      id: crypto.randomUUID(),
      name,
      width: 800,
      height: 1000,
      color: '#fff',
      widgets: [],
    }
  }

  addWidget(widget: WidgetModel) {
    this.page.widgets.push(widget)
  }

  deleteWidget(widgetId: string) {
    const widgetToDelete = this.page.widgets.find((w) => w.id === widgetId)
    if (!widgetToDelete) return
    this.page.widgets = this.page.widgets.filter((w) => w !== widgetToDelete)
  }
}
