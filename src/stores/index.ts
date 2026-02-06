import { editorState } from './State'
import * as selectors from './selectors'
import * as actions from './Actions'

/**
 * Editor Store – Public API
 *
 * This module exposes the full editor store as a single object.
 * It aggregates:
 *  - the reactive state
 *  - selectors (computed getters)
 *  - actions (state mutation functions)
 *
 * This file is the only entry point that Vue components should import.
 * Internal modules (State, Selectors, Actions) remain private and modular.
 */
export const editorStore = {
  state: editorState,
  ...selectors,
  ...actions,
}
