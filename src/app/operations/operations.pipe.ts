import { Pipe, PipeTransform } from '@angular/core'
import { Operation, Operators } from './operations.types'

type OperandsMeta = { [key in Operators]: {
  symbol: string,
  action: CallableFunction
} }

@Pipe({
  name: 'operations'
})
export class OperationsPipe implements PipeTransform {
  private readonly operandsMeta: OperandsMeta = {
    [Operators.Add]: {
      symbol: '+',
      action: (a: number, b: number) => a + b
    },
    [Operators.Multiply]: {
      symbol: '*',
      action: (a: number, b: number) => a * b
    }
  }

  transform (value: Operation): string {
    if (!value.operand) return '<MISSING DATA>'
    const operand1 = value.numberAction.value
    const operand2 = value.operand.value
    const meta = this.operandsMeta[value.numberAction.action]
    const result = meta.action(operand1, operand2)
    return `${operand1} ${meta.symbol} ${operand2} = ${result}`
  }
}
