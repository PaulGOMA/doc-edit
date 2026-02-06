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
