import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: [ './empty-list.component.scss' ]
})
export class EmptyListComponent {

  @Input()
  public title: string = 'Title';

  @Input()
  public subtitle: string = 'Subtitle';

  @Input()
  public icon: string = 'icon icon-list';

}
