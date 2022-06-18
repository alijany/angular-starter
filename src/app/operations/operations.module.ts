import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OperationsService } from './operations.service'
import OperationsComponent from './operations.component'

@NgModule({
  declarations: [
    OperationsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OperationsComponent
  ],
  providers: [
    OperationsService
  ]
})
export class OperationsModule { }
