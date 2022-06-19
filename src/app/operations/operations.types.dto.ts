// this file describe schemas that be used to validate data

import { Describe, enums, number, object } from 'superstruct'
import { NumberAction, Operand, Operators } from './operations.types'

export const Operators$ = enums([Operators.Add, Operators.Multiply])

export const Operand$ : Describe<Operand> = object({
  value: number()
})

export const NumberAction$ : Describe<NumberAction> = object({
  action: Operators$,
  value: number()
})
