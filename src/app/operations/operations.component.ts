import { Component, OnInit } from '@angular/core'
import { OperationsService } from './operations.service'
import { NumberAction, Operation } from './operations.types'

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export default class OperationsComponent implements OnInit {
  constructor (private operationService: OperationsService) { }

  operations: Operation[] = []

  private getOperation (action:NumberAction) {
    this.operationService.getOperand(action).subscribe(
      res => {
        const hasError = 'error' in res
        if (hasError) {
          console.log('error')
        }
        this.operations.push({
          operand: hasError ? res.data : res,
          numberAction: action
        })
      }
    )
  }

  getActions (): void {
    this.operationService.getActions().subscribe(
      res => {
        if ('error' in res) {
          console.log(res) // TODO: show snackbar with description «Server Error»
          return
        }
        this.getOperation(res)
      }
    )
  }

  ngOnInit (): void {
    this.getActions()
  }
}
