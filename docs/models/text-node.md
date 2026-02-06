# TextNode

## Overview

`TextNode` is the specialized data structure representing a text component inside the WYSIWYG editor.

It extends the base `ComponentNode` interface and adds all properties required to render and edit typographic content.

This node is used by:

- the canvas renderer

- the editing assistant

- the document serializer

- future exporters (JSON, PDF, UI frameworks…)

It is designed to be **simple**, **strictly typed**, and **scalable**.

## Interface Definition

```Ts
import type { ComponentNode } from './ComponentNode'

export interface TextNode extends ComponentNode {
    type: 'text'
    props: {
        text: string
        fontSize: number
        fontWeight: 'normal' | 'bold' | 'black' | number
        fontStyle: 'regular' | 'italic'
        fontFamily: string
        lineHeight: number
        textAlign: 'left' | 'center' | 'right' | 'justify'
        color: string
    }
}
```

### Base Inheritance

`TextNode` inherits from `ComponentNode`, which provides:

- `id` — unique identifier

- `x`, `y` — position on the canvas

- `width`, `height` — bounding box

- `type` — discriminant for TypeScript narrowing

- `props` — container for component‑specific properties

This ensures consistency across all component types.

## Property Details

### Text content

| Property   | Type     | Description                                |
| ---------- | -------- | ------------------------------------------ |
| **_text_** | `string` | _The actual text displayed on the canvas._ |

### Typography

| Property         | Type                                   | Description                                             |
| ---------------- | -------------------------------------- | ------------------------------------------------------- |
| **_fontSize_**   | `number`                               | _Font size in pixels._                                  |
| **_fontWeight_** | `'normal', 'bold', 'black', 'number'`  | _Weight of the font. Numeric values allow fine control_ |
| **_fontStyle_**  | `'regular', 'italic'`                  | _Style of the font._                                    |
| **_fontFamily_** | `string`                               | _Name of the font family._                              |
| **_lineHeight_** | `number`                               | _Vertical spacing between lines._                       |
| **_height_**     | `number`                               | _Component height in pixels._                           |
| **_textAlign_**  | `'left', 'center', 'right', 'justify'` | _Horizontal alignment of the text_                      |

### Color

| Property    | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| **_color_** | `string` | _Text color in hex format._ |

## Factory Function

The factory function creates a fully initialized `TextNode` with consistent default values.

```Ts
export function createTextNode(): TextNode {
    return {
        id: crypto.randomUUID(),
        type: 'text',
        x: 0,
        y: 0,
        width: 150,
        height: 40,
        props: {
        text: 'New text',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'regular',
        fontFamily: 'Arial',
        lineHeight: 12,
        textAlign: 'left',
        color: '#000000',
        },
    }
}
```

### Purpose of the Factory

- Ensures every `TextNode` is valid and complete

- Centralizes default values

- Simplifies creation inside the editor

- Avoids duplication and inconsistencies

- Makes the system scalable when adding new component types

## Usage Example

### Creating a new text component

```Ts
const node = createTextNode()
document.pages[0].components.push(node)
```

### Updating text content

```Ts
node.props.text = "Hello world"
```

### Rendering in Vue

```html
<div
  :style="{
        position: 'absolute',
        left: node.x + 'px',
        top: node.y + 'px',
        width: node.width + 'px',
        height: node.height + 'px',
        fontSize: node.props.fontSize + 'px',
        fontWeight: node.props.fontWeight,
        fontStyle: node.props.fontStyle,
        fontFamily: node.props.fontFamily,
        lineHeight: node.props.lineHeight + 'px',
        textAlign: node.props.textAlign,
        color: node.props.color
    }"
>
  {{ node.props.text }}
</div>
```
