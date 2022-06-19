import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, concatMap, from, map, mergeMap, Observable, of, shareReplay } from 'rxjs'
import { array, assert, Describe } from 'superstruct'
import { Error, NumberAction, Operand, Operators } from './operations.types'
import { NumberAction$, Operand$ } from './operations.types.dto'

type OperandsURLs = { [key in Operators]: URL }

@Injectable()
export class OperationsService {
  constructor (private http: HttpClient) {
    this.getOperand = this.getOperand.bind(this)
  }

  // TODO inject as Config
  private readonly baseURL = new URL('http://localhost:3000')

  private readonly numbersUrl = new URL('/numbers', this.baseURL)

  private readonly operandURLs: OperandsURLs = {
    [Operators.Add]: new URL('/add', this.baseURL),
    [Operators.Multiply]: new URL('/multiply', this.baseURL)
  }

  private cachedOperands: Map<Operators, Observable<Operand | null>> = new Map()

  /**
   * TODO: extract to separate service
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param data - value to return as the observable result
   */
  private handleError<T> (data: T) {
    return (error: HttpErrorResponse): Observable<Error<T>> => {
      return of({
        data,
        error: error.status === 0
          ? 'An error occurred'
          : `Backend returned code ${error.status}`
      })
    }
  }

  private validate<T> (value: T, schema: Describe<T>): T {
    assert(value, schema)
    return value
  }

  getOperand ({ action }: { action: Operators }) {
    const cachedOperand = this.cachedOperands.get(action)
    if (cachedOperand) return cachedOperand
    const url = String(this.operandURLs[action])
    const operand = this.http.get<Operand>(url).pipe(
      map(operand => this.validate(operand, Operand$)),
      catchError(() => of(null)),
      shareReplay(1)
    )
    this.cachedOperands.set(action, operand)
    return operand
  }

  getActions () {
    const url = String(this.numbersUrl)
    return this.http.get<NumberAction[]>(url)
      .pipe(
        map(action => this.validate(action, array(NumberAction$))),
        mergeMap(actions => from(actions)),
        mergeMap(action => {
          return this.getOperand(action).pipe(
            map(operand => ({ operand, numberAction: action }))
          )
        }),
        catchError(this.handleError(null))
      )
  }
}
