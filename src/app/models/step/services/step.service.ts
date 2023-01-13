import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Step, StepPayload } from '../../../interfaces/step.interface';
import { StepResource } from '../resources/step.resource';


@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(
    private readonly resource: StepResource) {
  }


  public getAll(): Observable<Step[]> {
    return this.resource.getAll();
  }


  public getOne(id: number): Observable<Step> {
    return this.resource.getOne(id);
  }


  public create(value: StepPayload): Observable<Step> {
    return this.resource.create(value);
  }


  public update(id: number, value: Partial<StepPayload>): Observable<Step> {
    return this.resource.update(id, value);
  }


  public delete(id: number): Observable<void> {
    return this.resource.delete(id);
  }
}
