# DocumentModel

## Overview

`DocumentModel` represents the entire editable document.

It contains one or more pages and acts as the root of the data model.

## Interface Definition

```Ts
export interface DocumentModel {
    id: string
    pages: PageModel[]
}
```

### Property Details

| Property    | Type          | Description                                |
| ----------- | ------------- | ------------------------------------------ |
| **_id_**    | `string`      | _Unique identifier for the document._      |
| **_pages_** | `PageModel[]` | _List of pages contained in the document._ |

## Factory Function

```Ts
export function createDocumentModel(): DocumentModel {
    return {
        id: crypto.randomUUID(),
        pages: [createPageModel()],
    }
}
```

### Purpose

- Creates a new document with a default first page

- Ensures the document is always valid

- Centralizes document initialization logic
