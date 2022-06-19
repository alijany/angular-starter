import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { MaterialModule } from '../material/material.module'

import { cold, getTestScheduler } from 'jasmine-marbles'
import OperationsComponent from './operations.component'
import { OperationsPipe } from './operations.pipe'
import { OperationsService } from './operations.service'

describe('OperationsComponent', () => {
  let component: OperationsComponent
  let fixture: ComponentFixture<OperationsComponent>
  let operationServiceSpy: jasmine.SpyObj<OperationsService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('OperationsService', {
      getOperations: of({ data: null, error: 'error' })
    })

    await TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: OperationsService, useValue: spy }
      ],
      declarations: [
        OperationsComponent,
        OperationsPipe
      ]
    })
      .compileComponents()

    operationServiceSpy = TestBed.inject(OperationsService) as jasmine.SpyObj<OperationsService>
    fixture = TestBed.createComponent(OperationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should load', () => {
    const q$ = cold('---x|', {
      x: {
        numberAction: { value: 2, action: 'add' },
        operand: { value: 3 }
      }
    })
    operationServiceSpy.getOperations.and.returnValue(q$)
    component.ngOnInit()

    fixture.detectChanges() // ngOnInit()

    expect(component.operations.length)
      .withContext('operations list should be empty')
      .toBe(0)

    getTestScheduler().flush() // flush the observables
    fixture.detectChanges() // update view

    expect(component.operations.length)
      .withContext('operations list should not be empty')
      .not.toBe(0)
  })
})
