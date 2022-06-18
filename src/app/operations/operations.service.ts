import { Injectable } from '@angular/core'

@Injectable()
export class OperationsService {
  getOperations () {
    return [
      '1 + 3 = 4',
      '2 * 4 = 8',
      '2 + 3 = 5'
    ]
  }
}
