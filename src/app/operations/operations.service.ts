import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, concatMap, from, map, mergeMap, Observable, of, shareReplay, tap } from 'rxjs'
import { array, assert, Describe } from 'superstruct'
import { Error, NumberAction, Operand, Operation, Operators } from './operations.types'
import { NumberAction$, Operand$ } from './operations.types.dto'
import { environment } from '../../environments/environment'

type OperandsURLs = { [key in Operators]: URL }
type CachedOperand = Map<Operators, Observable<Operand | null>>

@Injectable()
export class OperationsService {
  constructor (private http: HttpClient) {
    this.getOperand = this.getOperand.bind(this)
  }

  private readonly baseURL = environment.baseURL

  private readonly numbersUrl = new URL('/numbers', this.baseURL)

  private readonly operandURL: OperandsURLs = {
    [Operators.Add]: new URL('/add', this.baseURL),
    [Operators.Multiply]: new URL('/multiply', this.baseURL)
  }

  // cachedOperands holds Operator-Operand pairs
  private cachedOperands: CachedOperand = new Map()

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

  /**
   * Assert that value is valid according to a schema.
   * If the value is invalid an error will be thrown.
   *
   * @param data - value to check is valid according to a schema
   * @param schema - schema to describe the structure of data
   */
  private validate<T> (value: T, schema: Describe<T>): void {
    assert(value, schema)
  }

  /**
   * @param NumberAction - an action that is used to get the appropriate operand
   * @returns Observable<Operand | null>
   */
  private getOperand ({ action }: { action: Operators }): Observable<Operand | null> {
    const cachedOperand = this.cachedOperands.get(action)
    if (cachedOperand) return cachedOperand
    const url = String(this.operandURL[action])
    const operand = this.http.get<Operand>(url).pipe(
      tap(operand => this.validate(operand, Operand$)),
      catchError(() => of(null)),
      shareReplay(1)
    )
    this.cachedOperands.set(action, operand)
    return operand
  }

  /**
   * get action and theme corresponding operand,
   * then returns appropriate operation
   *
   * @returns Observable<Operation | Error>
   */
  getOperations (): Observable<Operation | Error> {
    const url = String(this.numbersUrl)
    return this.http.get<NumberAction[]>(url)
      .pipe(
        // validate server response
        tap(actions => this.validate(actions, array(NumberAction$))),
        concatMap(actions => from(actions)),
        // get operand of each operator and return operation
        mergeMap(action => {
          return this.getOperand(action).pipe(
            map(operand => ({ operand, numberAction: action }))
          )
        }),
        catchError(this.handleError(null))
      )
  }
}
