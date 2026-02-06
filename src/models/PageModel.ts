import type { ComponentNode } from './ComponentNode'

export interface PageModel {
  id: string
  name?: string
  width: number
  height: number
  color: string
  components: ComponentNode[]
}

export function createPageModel(name = 'Page 1'): PageModel {
  return {
    id: crypto.randomUUID(),
    name,
    width: 800, // format par défaut (modifiable plus tard)
    height: 1200,
    color: '#fff',
    components: [],
  }
}
