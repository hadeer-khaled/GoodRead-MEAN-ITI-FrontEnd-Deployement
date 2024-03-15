import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedNavComponent } from './loged-nav.component';

describe('LogedNavComponent', () => {
  let component: LogedNavComponent;
  let fixture: ComponentFixture<LogedNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogedNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogedNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
