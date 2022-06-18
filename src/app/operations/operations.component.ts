import { Component, OnInit } from '@angular/core'
import { OperationsService } from './operations.service'

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export default class OperationsComponent implements OnInit {
  constructor (private operationService: OperationsService) { }

  operations?: string[]

  getOperations (): void {
    this.operations = this.operationService.getOperations()
  }

  ngOnInit (): void {
    this.getOperations()
  }
}
