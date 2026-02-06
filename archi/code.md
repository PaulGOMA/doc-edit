### ComponentType

```ts
export type ComponentType = 'text' | 'page'
```

--

### ComponentNode

```ts
export interface ComponentNode {
  id: string
  type: ComponentType
  x: number
  y: number
  width: number
  height: number
  props: Record<string, unknown>
}
```

--

### PageModel

```ts
export interface DocumentModel {
  pages: Array<ComponentNode> // ici un ComponentNode de type "page"
  // Plus tard on ajoutera les métadatas
}
```

--
