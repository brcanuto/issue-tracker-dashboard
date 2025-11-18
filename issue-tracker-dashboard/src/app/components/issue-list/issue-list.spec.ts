import { ComponentFixture, TestBed } from '@angular/core/testing'

import { IssueListComponent } from './issue-list'

describe('IssueListComponent', () => {
  let component: IssueListComponent
  let fixture: ComponentFixture<IssueListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueListComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(IssueListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
