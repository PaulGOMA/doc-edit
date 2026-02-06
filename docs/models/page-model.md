# PageModel

## Overview

`PageModel` represents a single page inside the document.

It acts as a container for components (`ComponentNode`) and defines the page’s dimensions and metadata.

A page is **not** a component.

It is a higher‑level structure that organizes the document.

## Interface Definition

```Ts
export interface PageModel {
    id: string
    name?: string
    width: number
    height: number
    color: string
    components: ComponentNode[]
}
```

### Property Details

| Property         | Type              | Description                               |
| ---------------- | ----------------- | ----------------------------------------- |
| **_id_**         | `string`          | _Unique identifier for the page._         |
| **_name_**       | `string?`         | _Optional display name (e.g., “Page 1”)._ |
| **_width_**      | `number`          | _Page width in pixels._                   |
| **_height_**     | `number`          | _Page height in pixels._                  |
| **_color_**      | `string`          | _Background color for the page._          |
| **_components_** | `ComponentNode[]` | _List of components placed on the page._  |

## Factory Function

```Ts
export function createPageModel(name = 'Page 1'): PageModel {
    return {
        id: crypto.randomUUID(),
        name,
        width: 800,
        height: 1200,
        color: "#fff",
        components: [],
    }
}
```

### Purpose

- Provides a consistent default page structure

- Centralizes default values (format, naming…)

- Simplifies page creation inside the editor

- Ensures every page is valid and complete
