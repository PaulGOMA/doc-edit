import type { ImageWidgetModel } from '../models/ImageWidgetModel'
import type { NodeFactory } from '../node_factory/NodeFactory'

export class ImageWidget implements NodeFactory {
  constructor(private src: string) {}
  createNode(): ImageWidgetModel {
    return {
      id: crypto.randomUUID(),
      type: 'image',
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      props: {
        source: this.src,
        alt: 'No description provided',
        scaleMode: 'none',
      },
    }
  }
}
