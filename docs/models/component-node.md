# ComponentNode

## Overview

`ComponentNode` is the base interface for all visual components placed on a page inside the WYSIWYG editor.
It defines the minimal set of properties shared by every component type, regardless of its nature (text, image, form element, container, etc.).

All specialized components (e.g., `TextNode`, `ImageNode`, `CheckboxNode`) extend this interface.

## Interface Definition

```Ts
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

### Property Details

| Property     | Type                      | Description                                                                                     |
| ------------ | ------------------------- | ----------------------------------------------------------------------------------------------- |
| **_id_**     | `string`                  | _Unique identifier for the component. Used for selection, editing, and serialization._          |
| **_type_**   | `ComponentType`           | _Discriminant used to identify the component subtype (e.g., "text", "image")._                  |
| **_x_**      | `number`                  | _Horizontal position on the page canvas (in pixels)._                                           |
| **_y_**      | `number`                  | _Vertical position on the page canvas (in pixels)._                                             |
| **_width_**  | `number`                  | _Component width in pixels._                                                                    |
| **_height_** | `number`                  | _Component height in pixels._                                                                   |
| **_props_**  | `Record<string, unknown>` | _Container for component‑specific properties. Each specialized node defines its own structure._ |

## Design Principles

- **Minimalism**  
  Only the properties common to all components are included.

- **Extensibility**  
  Specialized components extend `ComponentNode` and define their own `props`.

- **Serialization‑friendly**  
  The structure is fully JSON‑compatible.

- **UI‑agnostic**  
  No Vue‑specific or rendering‑specific logic is included.

- **Stable foundation**  
  This interface is the backbone of the editor’s data model.

## Example of Specialization

```Ts
export interface TextNode extends ComponentNode {
    type: 'text'
    props: {
        text: string
        fontSize: number
        color: string
    }
}
```
