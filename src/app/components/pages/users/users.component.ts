import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/services/alert.service';
import { GenericModalInsertComponent } from '../../genericComponent/generic-modal-insert/generic-modal-insert.component';
import { PersonUpdateModalComponent } from '../../shared/modal/person-update-modal/person-update-modal.component';
import { ClientService } from 'src/app/services/crud/client.service';
import { HttpClientModule } from '@angular/common/http';
import { GenericFormgroupComponent } from '../../genericComponent/generic-formgroup/generic-formgroup.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  user: any;
  filter = [];

  // Header of the <table>, name is what the user see, key is the real name of the key of obj
  arrHeader = [
    { name: 'Organization', key: 'orga' },
    { name: 'Valor Cuenta En $ARG', key: 'accountValue' },
    { name: 'Apellido', key: 'name' },
    { name: 'Nombre', key: 'firstName' },
    { name: 'Email', key: 'email' },
    { name: 'Dirrecion', key: 'adress' },
    { name: 'Cellular', key: 'phone' },
  ];

  formRulesUpdate = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Organization',
      label: 'Cambiar Empreza',
      formControl: 'orga',
    },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Valor',
      label: 'Cambiar Valor De La Cuenta',
      formControl: 'accountValue',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Apellido',
      label: 'Cambiar El Apellido',
      formControl: 'name',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Nombre',
      label: 'Cambiar El Nombre',
      formControl: 'firstName',
    },

    {
      typeForm: 'input',
      typeInput: 'email',
      placeholder: 'Mail',
      label: 'Cambiar El Mail',
      formControl: 'email',
    },

    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Dirrecion',
      label: 'Cambiar Dirrecion',
      formControl: 'adress',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Cellular',
      label: 'Cambiar Cellular',
      formControl: 'phone',
    },
  ];
  formRulesInsert = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Apellido',
      label: 'Cambiar El Apellido',
      formControl: 'name',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Nombre',
      label: 'Cambiar El Nombre',
      formControl: 'firstName',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Organization',
      label: 'Cambiar Empreza',
      formControl: 'orga',
    },
    {
      typeForm: 'input',
      typeInput: 'email',
      placeholder: 'Mail',
      label: 'Cambiar El Mail',
      formControl: 'email',
    },

    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Dirrecion',
      label: 'Cambiar Dirrecion',
      formControl: 'adress',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Cellular',
      label: 'Cambiar Cellular',
      formControl: 'phone',
    },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Valor',
      label: 'Cambiar Valor De La Cuenta',
      formControl: 'accountValue',
    },
  ];
  // Can be replaced by any SQL response
  arrMainNgFor = [];

  // option which deserve to add a searchBar upper the table, searchbar can be NULL.
  searchBar = {
    placeholder: 'Buscar un usuario',
  };

  // text alert when filter make the ngFor array lengh coming to zero
  alertMsgFilterNoMatch = 'Esos filtros no corresponden a ninguno usuarios';
  // actions is initialized at null, but it can be filled by an array with the text of the action and the method to call, if it stay null, the generic table will only be for display
  // actions is always filled in the ngOnInit, otherwise we get an error "property is used before initialisation" ///// the method passed to the obj are method with callback
  // this.actions = [
  //   { text: 'Modifier', method: this.updateUser },
  //   { text: 'Supprimer', method: this.deleteUser },
  // ];
  actions: any = null;

  constructor(
    private simpleModalService: SimpleModalService,
    private alert: AlertService,
    private clientService: ClientService,
    private http: HttpClientModule,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    //
    await this.loadClients();
    console.log(this.arrMainNgFor, 'arrMain');

    this.actions = [
      { text: 'Modificar', method: this.updateUser },
      { text: 'Borrar', method: this.deleteUser },
    ];
  }

  async loadClients() {
    await this.clientService.getClient({}).subscribe((res) => {
      console.log(res, 'res');
      this.arrMainNgFor = res;
    });
  }

  insertUser() {
    console.log(this.formRulesInsert, 'this.formRulesInsert');
    let form = new FormGroup({
      name: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      adress: new FormControl('', Validators.required),
      orga: new FormControl('', Validators.required),
      accountValue: new FormControl(0, Validators.required),
      phone: new FormControl('', Validators.required),
    });
    let title = 'Entrar Un Nuevo Cliente';
    console.log(title, 'title');

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,
        formRules: this.formRulesInsert,
        title: title,
      })
      .subscribe(async (data) => {
        if (data) {
          await this.auth.register(data).subscribe((res) => {
            if (res) {
              console.log(res, 'res');
              this.alert.success(
                'Los datos del usuario fueron modificado en la base de datos !'
              );
              this.simpleModalService
                .addModal(GenericFormgroupComponent, {
                  title: 'Anotar la Contrasena de este nuevo cliente',
                  form: new FormGroup({
                    password: new FormControl(
                      res.password,
                      Validators.required
                    ),
                  }),
                  formRules: [
                    {
                      typeForm: 'input',
                      typeInput: 'text',
                      label: 'Contrasena del Cliente',
                      formControl: 'password',
                    },
                  ],
                })
                .subscribe(async (data) => {
                  if (data) {
                    window.location.reload();
                  }
                });
            } else {
              this.alert.error('El servidor se encontro con un problema');
            }
          });

          //We get modal result
          subscription.unsubscribe();
          console.log('data del usuarioamigo', data);
        }
      });
  }

  updateUser = (user: any): void => {
    let title = 'Cambiar Los Datos Del Cliente';
    let form = new FormGroup({
      id: new FormControl(user.id, Validators.required),
      name: new FormControl(user.name, Validators.required),
      firstName: new FormControl(user.firstName, Validators.required),
      email: new FormControl(user.email, Validators.required),
      adress: new FormControl(user.adress, Validators.required),
      orga: new FormControl(user.orga, Validators.required),
      accountValue: new FormControl(user.accountValue, Validators.required),

      phone: new FormControl(user.phone, Validators.required),
    });

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,
        formRules: this.formRulesUpdate,
        title: title,
      })
      .subscribe(async (data) => {
        if (data) {
          await this.clientService.insertUpdateClient(data).subscribe((res) => {
            if (res) {
              this.alert.success(
                'Los datos del usuario fueron modificado en la base de datos !'
              );
              setTimeout(() => {
                window.location.reload();
              }, 4000);
            } else {
              this.alert.error('El servidor se encontro con un problema');
            }
          });

          //We get modal result
          subscription.unsubscribe();
          console.log('data del usuarioamigo', data);
        }
      });
  };

  deleteUser = (user: any): void => {
    console.log(user, 'user');
    if (user) {
      this.clientService.deleteClient(user).subscribe((res) => {
        if (res) {
          this.alert.success(
            'Los datos del usuario fueron modificado en la base de datos !'
          );
          window.location.reload();
        } else {
          this.alert.error('El servidor se encontro con un problema');
        }
      });

      this.alert.warn('En Trabajo');
    }
  };
}

// array of fiter, each item of the array become a <select>
// option is used to fill the <option>
// placeholder is the first row "<option disabled selected>" (kind of <select> title)
// keyNgForFilter : we're iterating on an ngFor, this string has to know which key of the current iteration we have to filter
// EX : keyNgForFilter: 'id_category' ===>>> arrNgFor.filter((el[keyNgForFilter] == ...))
// keyOptionFilter : this time, it's for precise by which key we filter
// EX : keyOptionFilter : 'id' ======>>>>>>  we have a select with a <option ngFor="let item of option">, if option is an array of object we can precise which key use for filter
// EX : combining  keyNgForFilter : id  && keyOptionFilter : id_category  ====>>>> <option ngFor="let item of option value="item[obj.keyOptionFilter]">
// SO the filter function will do something like  arrNgFor.filter((el[keyNgForFilter] == item.target.value)) value will be the "item[obj.keyOptionFilter]"*
// filterNgModelValue && filterValue are just 2 values which deserve to handle some display logic and reseting the <select> correctly
//optionDisplaykey is used when the option arrays is an array of object to display the "text" value <option ngFor="let item of option >{{item[obj.optionDisplaykey]}}</option>
// filter can be equal to NULL, in this case no filter on the table
// filter = [
// {
//   option: ['Synexie', 'Sema'],
//   placeholder: 'Filtrar por Organization',
//   keyNgForFilter: 'orga',
//   keyOptionFilter: '',
//   filterValue: '',
//   filterNgModelValue: '',
//   optionDisplaykey: '',
// },
// {
//   option: [
//     { id: 2, txt: 'dehka1' },
//     { id: 3, txt: 'dehka2' },
//   ],
//   placeholder: 'Filtrar por dehka',
//   keyNgForFilter: 'idDehka',
//   keyOptionFilter: 'id',
//   filterValue: '',
//   filterNgModelValue: '',
//   optionDisplaykey: 'txt',
// },
// //if the filter is used on an array of object the keyOptionFilter is used
// {
//   option: ['Maxime', 'Alexandre'],
//   placeholder: 'Filtrar por Nombre',
//   keyNgForFilter: 'name',
//   keyOptionFilter: '',
//   filterValue: '',
//   filterNgModelValue: '',
//   optionDisplaykey: '',
// },
// ];
