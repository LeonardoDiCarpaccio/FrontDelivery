import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-generic-formgroup',
  templateUrl: './generic-formgroup.component.html',
  styleUrls: ['./generic-formgroup.component.scss'],
})
export class GenericFormgroupComponent
  extends SimpleModalComponent<any, any>
  implements OnInit
{
  person: any;

  @Input() formRules: any;
  @Input() clientName: any;
  @Input() clientFirstName: any;
  @Input() mail: any;
  @Input() price: any;
  @Input() location: any;
  @Input() orga: any;
  @Input() account: any;
  @Input() id: any;
  @Input() title: any;
  @Input() form: FormGroup;

  constructor(private fb: FormBuilder, private alert: AlertService) {
    super();
  }

  ngOnInit(): void {
    // this.buildForm();
    console.log(this.title, 'title');
    console.log(this.form, 'form');
  }

  addValueToSelect(
    idSelected: any,
    formControl: string,
    options,
    idReset: string,
    isSelectionOnId: boolean
  ) {
    let optionToPush;
    let testIfOptionIsFindOnActualArray;
    if (isSelectionOnId) {
      optionToPush = options.find((el) => el.id == idSelected);
      testIfOptionIsFindOnActualArray =
        this.form
          .get(formControl)
          .value.find((el) => el.id == optionToPush.id) === undefined;
    } else {
      optionToPush = options.find((el) => el == idSelected);
      testIfOptionIsFindOnActualArray =
        this.form.get(formControl).value.find((el) => el == optionToPush) ===
        undefined;
    }

    if (testIfOptionIsFindOnActualArray) {
      this.form.get(formControl).value.push(optionToPush);
      document.getElementById(idReset)['value'] = '';
    } else {
      this.alert.warn('Vous avez déjà séléctionné cette option');
      document.getElementById(idReset)['value'] = '';
    }
  }

  removeValueFromSelect(
    itemSelected,
    formControl: string,
    isSelectionOnId: boolean
  ) {
    let indexToSplice;
    if (isSelectionOnId) {
      indexToSplice = this.form
        .get(formControl)
        .value.findIndex((el) => el.id == itemSelected.id);
    } else {
      indexToSplice = this.form
        .get(formControl)
        .value.findIndex((el) => el == itemSelected);
    }

    this.form.get(formControl).value.splice(indexToSplice, indexToSplice + 1);
    console.log(itemSelected);
  }
  // buildForm(): void {
  //   this.form = this.fb.group({
  //     id: [this.id],

  //     clientName: [this.clientName, Validators.required],
  //     clientFirstName: [this.clientFirstName, Validators.required],
  //     mail: [this.mail, Validators.required],
  //     price: [this.price, Validators.required],
  //     location: [this.location, Validators.required],
  //     orga: [this.orga, Validators.required],
  //     account: [this.account, Validators.required],
  //   });
  // }

  OnSubmitUserForm() {
    this.confirm();
    console.log(
      JSON.parse(JSON.stringify(this.form.value)),
      'estamos aca la concha de tu hermana'
    );
  }
  confirm() {
    this.result = JSON.parse(JSON.stringify(this.form.value));
    this.close();
  }
  send;
}
