'use client'

import 'katex/dist/katex.min.scss'
import { InlineMath } from 'react-katex'

const InlineEquation = ({ equation }) => (
  <InlineMath math={equation.Expression} />
)

export default InlineEquation
