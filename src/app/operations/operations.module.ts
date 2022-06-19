import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OperationsService } from './operations.service'
import OperationsComponent from './operations.component'
import { OperationsPipe } from './operations.pipe'

@NgModule({
  declarations: [
    OperationsComponent,
    OperationsPipe
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
