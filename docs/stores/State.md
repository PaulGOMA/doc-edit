# Editor State

## Overview

`editorState` is the reactive root state of the WYSIWYG editor. It contains the document model, UI state, and editing context. This module stores data only — no logic, no mutations, no selectors.

It is consumed by:

- selectors (read-only computed values)

- actions (state mutation functions)

- Vue components (canvas, assistants, toolbar…)

## State Definition

```Ts
export const editorState = reactive({
  document: createDocumentModel(),
  selectedComponentId: null as string | null,
  activePageIndex: 0,
  activeAssistant: 'none' as 'none' | 'insert' | 'edit',
})
```

## Property Details

| Property                  | Type                       | Description                                                  |
| ------------------------- | -------------------------- | ------------------------------------------------------------ |
| **_document_**            | `DocumentModel`            | _The full editable document (pages + components)._           |
| **_selectedComponentId_** | `string, null`             | _ID of the currently selected component, or `null` if none._ |
| **_activePageIndex_**     | `'regular', 'italic'`      | _Style of the font._                                         |
| **_activeAssistant_**     | `'none', 'insert', 'edit'` | _Indicates which assistant panel is open._                   |

## Design Principles

- **Single source of truth** for the editor

- **Reactive** to update the UI automatically

- **UI-agnostic** (no Vue logic inside)

- **Minimal** (only raw data)

- **Extensible** for future features (undo/redo, multi-selection, drag state…)
