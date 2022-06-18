import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, concatMap, from, map, mergeMap, Observable, of, shareReplay } from 'rxjs'
import { NumberAction, Operand, Operation, Operators } from './operations.types'

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

  private cachedOperands: Map<Operators, Observable<{data:Operation, error:string|null}>> = new Map()

  /**
   * TODO: extract to separate service
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param data - value to return as the observable result
   */
  private handleError<T> (data: T) {
    return (error: HttpErrorResponse): Observable<{data:T, error:string}> => {
      return of({
        data,
        error: error.status === 0
          ? 'An error occurred'
          : `Backend returned code ${error.status}`
      })
    }
  }

  private getOperand (numberAction: NumberAction) {
    const cachedOperand = this.cachedOperands.get(numberAction.action)
    if (cachedOperand) {
      return cachedOperand
    } else {
      const url = String(this.operandURLs[numberAction.action])
      const getOperand = this.http.get<Operand>(url).pipe(
        map(operand => ({ data: { operand, numberAction }, error: null })), // TODO add data validation
        catchError(this.handleError({ operand: null, numberAction })),
        shareReplay(1)
      )
      this.cachedOperands.set(numberAction.action, getOperand)
      return getOperand
    }
  }

  getActions () {
    return this.http.get<NumberAction[]>(String(this.numbersUrl))
      .pipe(
        map(action => ({ data: action, error: null })), // TODO add data validation
        catchError(this.handleError<undefined>(undefined))
      )
  }

  getOperations (numberActions: Observable<NumberAction[]>) {
    return numberActions
      .pipe(
        concatMap(numbers => from(numbers)),
        mergeMap(this.getOperand),
        catchError(this.handleError(null))
      )
  }
}
