import { OperationsPipe } from '../../../app/operations/operations.pipe'
import { Operators } from '../../../app/operations/operations.types'

describe('OperationsPipe', () => {
  it('create an instance', () => {
    const pipe = new OperationsPipe()
    expect(pipe).toBeTruthy()
  })

  it('should return <MISSING DATA>', () => {
    const pipe = new OperationsPipe()
    expect(pipe.transform({
      operand: null,
      numberAction: { value: 2, action: Operators.Add }
    })).toBe('<MISSING DATA>')
  })

  it('should return 2 + 3 = 5', () => {
    const pipe = new OperationsPipe()
    expect(pipe.transform({
      operand: { value: 3 },
      numberAction: { value: 2, action: Operators.Add }
    })).toBe('2 + 3 = 5')
  })

  it('should return 2 * 3 = 6', () => {
    const pipe = new OperationsPipe()
    expect(pipe.transform({
      operand: { value: 3 },
      numberAction: { value: 2, action: Operators.Multiply }
    })).toBe('2 * 3 = 6')
  })
})
