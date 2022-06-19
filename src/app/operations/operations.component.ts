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

  getActions (): void {
    this.operationService.getActions().subscribe(
      res => {
        if (res && 'error' in res) {
          console.log(res) // TODO: show snackbar with description «Server Error»
          return
        }
        this.operations.push(res)
      }
    )
  }

  ngOnInit (): void {
    this.getActions()
  }
}
