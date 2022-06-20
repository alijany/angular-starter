import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { OperationsService } from './operations.service'
import { Operation } from './operations.types'

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export default class OperationsComponent implements OnInit {
  constructor (
    private operationService: OperationsService,
    private snackBar: MatSnackBar
  ) { }

  operations: Operation[] = []

  isLoading = true

  openSnackBar (message: string, action: string) {
    this.snackBar.open(message, action)
  }

  getOperations (): void {
    this.operationService.getOperations().subscribe(
      res => {
        this.isLoading = false
        if (res && 'error' in res) {
          return this.openSnackBar('«Server Error»', 'Ok')
        }
        this.operations.push(res)
      }
    )
  }

  ngOnInit (): void {
    this.getOperations()
  }
}
