import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { OperationsModule } from './operations/operations.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OperationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
