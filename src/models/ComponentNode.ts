import type { ComponentType } from './ComponentType'

export interface ComponentNode {
  id: string
  type: ComponentType
  x: number
  y: number
  width: number
  height: number
  props: Record<string, unknown>
}
