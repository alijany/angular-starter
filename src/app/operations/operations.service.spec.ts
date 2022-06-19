import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { of } from 'rxjs'
import { is } from 'superstruct'

import { OperationsService } from './operations.service'
import { mockServerData } from './operations.service.mock'
import { Operation$ } from './operations.types.dto'

describe('OperationsService', () => {
  let service: OperationsService
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new OperationsService(httpClientSpy)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('#getOperations should return expected "operations"', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of([mockServerData.numbers[0]]))
    service.getOperations().subscribe({
      next: operation => {
        expect(is(operation, Operation$))
          .withContext('expected "operations"')
          .toBeTrue()
        done()
      },
      error: done.fail
    })
  })

  it('#getOperations should return expected "Error"', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found'
    })
    httpClientSpy.get.and.returnValue(of(errorResponse))
    service.getOperations().subscribe({
      next: error => {
        expect('error' in error)
          .withContext('expected "Error"')
          .toBeTrue()
        done()
      },
      error: done.fail
    })
  })
})
