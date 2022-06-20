import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { HttpClientInMemoryWebApiModule, InMemoryDbService } from 'angular-in-memory-web-api'
import { AppComponent } from '../../app/app.component'
import { OperationsModule } from '../../app/operations/operations.module'
import { mockServerData } from './app.service.mock'

@NgModule()
export class MockHttpClient implements InMemoryDbService {
  createDb () {
    return mockServerData
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(MockHttpClient),
        OperationsModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
