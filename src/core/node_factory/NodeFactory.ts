import type { NodeModel } from '../models/NodeModel'

export interface NodeFactory {
  createNode(): NodeModel
}
