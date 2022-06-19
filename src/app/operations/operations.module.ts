import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MaterialModule } from '../material/material.module'
import OperationsComponent from './operations.component'
import { OperationsPipe } from './operations.pipe'
import { OperationsService } from './operations.service'

@NgModule({
  declarations: [
    OperationsComponent,
    OperationsPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    OperationsComponent
  ],
  providers: [
    OperationsService
  ]
})
export class OperationsModule { }
