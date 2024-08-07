import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Languages } from 'src/app/enums/language.enum';
import { User } from '../../../../interfaces/account.interface';
import { DictItem } from '../../../../interfaces/dict.interface';
import { AccountActions } from '../../../../models/account/store/account.actions';
import { AccountState } from '../../../../models/account/store/account.state';


interface AccountForm {
  email: FormControl<string>;
  username: FormControl<string>;
  lang: FormControl<Languages>;
}


@Component({
  templateUrl: './settings-account.component.html',
  styleUrls: [ './settings-account.component.scss' ]
})
export class SettingsAccountComponent implements OnInit {

  public form!: FormGroup<AccountForm>;
  public formSent!: boolean;
  public languages!: DictItem[];

  public usernameMinlength = 4;

  private user!: User;


  constructor(
    private fb: FormBuilder,
    private store: Store) {

    this.languages = [
      { code: Languages.English, value: 'English' },
      { code: Languages.Russian, value: 'Русский' }
    ];
  }


  public ngOnInit(): void {
    this.user = this.store.selectSnapshot(AccountState.user);
    this.form = this.createForm(this.user);
  }


  public onSubmit(): void {
    if (this.form.valid) {
      this.formSent = true;
      this.store.dispatch(new AccountActions.UpdateAccount(this.form.value))
        .subscribe(() => {
          this.formSent = false;
        });
    }
  }


  private createForm(user: User): FormGroup<AccountForm> {
    return this.fb.nonNullable.group({
      email: [ { value: user.email, disabled: true }, [ Validators.required, Validators.email ] ],
      username: [ {
        value: user.username,
        disabled: false
      }, [ Validators.required, Validators.minLength(this.usernameMinlength) ] ],
      lang: [ user.lang ]
    });
  }

}
