import type { TextWidgetModel } from '../models/TextWidgetModel'
import type { NodeFactory } from '../node_factory/NodeFactory'

export class TextWidget implements NodeFactory {
  constructor() {
    this.createNode()
  }
  createNode(): TextWidgetModel {
    return {
      id: crypto.randomUUID(),
      type: 'text',
      x: 0,
      y: 0,
      width: 75,
      height: 20,
      props: {
        text: 'New text',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'Arial',
        lineHeight: 'normal',
        textAlign: 'left',
        color: '#000000',
        textDecoration: 'none',
      },
    }
  }
}
