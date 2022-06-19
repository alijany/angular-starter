import { LayoutModule } from '@angular/cdk/layout'
import { NgModule } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const modules = [
  LayoutModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
