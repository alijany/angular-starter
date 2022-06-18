/* eslint-disable no-unused-vars */
export enum Operators {
    Add = 'add',
    Multiply = 'multiply'
}

export interface Operand {
    value: number
}

export interface NumberAction extends Operand {
    action: Operators
}

export interface Operation {
    operand: Operand | null;
    numberAction: NumberAction;
}
