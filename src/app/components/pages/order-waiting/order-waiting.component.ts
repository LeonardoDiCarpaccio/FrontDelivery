import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { GenericModalInsertComponent } from '../../genericComponent/generic-modal-insert/generic-modal-insert.component';
import { PersonUpdateModalComponent } from '../../shared/modal/person-update-modal/person-update-modal.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { ToastrService } from 'ngx-toastr';
import { CommandService } from 'src/app/services/crud/command.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericFormgroupComponent } from '../../genericComponent/generic-formgroup/generic-formgroup.component';
import { ClientService } from 'src/app/services/crud/client.service';
import { UserService } from 'src/app/services/crud/user.service';
import { paramsService } from 'src/app/services/crud/params.service';

@Component({
  selector: 'app-order-waiting',
  templateUrl: './order-waiting.component.html',
  styleUrls: ['./order-waiting.component.scss'],
})
export class OrderWaitingComponent implements OnInit {
  user: any;
  arrHeader = [
    { name: 'Estado', key: 'name', obj: 'status' },
    { name: 'Tracking Number (shippingId)', key: 'id' },
    { name: 'Organization', key: 'orga', obj: 'client' },
    { name: 'Ubicacion', key: 'address' },

    { name: 'Feche De Primer Escaneo', key: 'creationDateDisplay' },
    { name: 'Ver Detalles', key: 'details' },
  ];

  arrMainNgFor = [];

  searchBar = {
    placeholder: 'Buscar un pedido',
  };

  filter = [];
  clientList: any;

  alertMsgFilterNoMatch = 'Esos filtros no corresponden a ningun pedido';

  actions: any = null;
  status: any = null;
  conductorList: unknown;
  constructor(
    private commandService: CommandService,
    private clientService: ClientService,
    private simpleModalService: SimpleModalService,
    private userService: UserService,
    private alert: AlertService,
    private params: paramsService
  ) {}

  async ngOnInit() {
    this.actions = [
      { text: 'Modificar', method: this.updatePedido },
      { text: 'Borrar', method: this.deletePedido },
    ];
    this.status = [{ text: 'Cambiar El Estado', method: this.changeStatus }];
    await this.loadCommand();
  }

  // !!!!!!!!!!!!!!!!!!!!!!REVOIR CETTE FONCTION
  //   "relations": ["status", "shipping_items", "params", "params.client"]
  // maybe ca mnt directement avec changement de lordre de lobjet pour le loop
  async loadCommand() {
    await this.commandService
      .findByCommand({
        where: { statusId: 1 },
        relations: ['status', 'shipping_items', 'params', 'params.client'],
      })
      .subscribe(async (res) => {
        console.log(res, 'res"');
        // await this.params
        //   .findByparams({
        //     In: { sender_id: res[0].params.id },
        //     relations: ['client'],
        //   })
        //   .subscribe((resClient) => {
        //     console.log(resClient, ' resClient');
        //     res[0].client = resClient[0].client;
        //     this.arrMainNgFor = res;
        //   });
        res.forEach((element) => {
          element.client = element.params.client;
        });
        this.arrMainNgFor = res;
        console.log(this.arrMainNgFor, 'arrMainNgFor');
      });
  }
  changeStatus = (status: any): void => {
    let update = {
      Pedido: {
        status: {
          id: status.id,
        },
      },
    };
  };
  async loadClient() {
    return new Promise((resolve, reject) => {
      this.clientService.getClient({}).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  async loadConductor() {
    return new Promise((resolve, reject) => {
      this.userService.findByUser({ where: { roleId: 2 } }).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async insertCommand() {
    let title = 'Anadir Un Pedido';
    this.clientList = await this.loadClient().catch((error) => {
      console.error(error);
    });
    this.conductorList = await this.loadConductor().catch((error) => {
      console.error(error);
    });
    let formRulesInsert = [
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'Tracking Id Del Pedido',
        label: 'ShippingId/TrackingId del Pedido',
        formControl: 'id',
      },
      {
        typeForm: 'dropdown',
        placeholder: 'Eligir Un Cliente',
        label: 'Selecionnar El Cliente',
        option: this.clientList,
        keyOption: 'name',
        formControl: 'sender_id',
      },
      {
        typeForm: 'input',
        typeInput: 'text',
        placeholder: 'Ubicacion Del Pedido',
        label: 'Ubicacion',
        formControl: 'address',
      },

      {
        typeForm: 'dropdown',
        placeholder: 'Eligir Conductor',
        label: 'Selecionnar El Conductor',
        option: this.conductorList,
        keyOption: 'name',
        formControl: 'conductorId',
      },
    ];

    let form = new FormGroup({
      id: new FormControl('', Validators.required),
      conductorId: new FormControl(Validators.required),
      statusId: new FormControl(1, Validators.required),
      sender_id: new FormControl('', Validators.required),
      creationDate: new FormControl(this.dateNow(true), Validators.required),
      creationDateDisplay: new FormControl(
        this.dateNowString(),
        Validators.required
      ),
      address: new FormControl('', Validators.required),
      // shipping_item: new FormArray([
      //   new FormGroup({
      //     description: new FormControl('', Validators.required),
      //     quantity: new FormControl(1, Validators.required),
      //     dimensions: new FormControl('', Validators.required),
      //     id: new FormControl(Validators.required),
      //   }),
      // ]),
    });

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,
        formRules: formRulesInsert,
        title: title,
      })
      .subscribe(async (data) => {
        if (data) {
          console.log(data, 'dataaaaaaaaaa');
          await this.commandService
            .insertUpdateCommand(data)
            .subscribe((res) => {
              if (res) {
                this.alert.success(
                  'Los datos del item fueron modificado en la base de datos !'
                );
                // window.location.reload();
              } else {
                this.alert.error('El servidor se encontro con un problema');
              }
            });

          //We get modal result
          subscription.unsubscribe();
          console.log('data del item', data);
        }
      });
  }

  deletePedido = (pedido: any) => {
    this.alert.warn('En Trabajo');

    if (pedido) {
      this.commandService.deleteCommand(pedido).subscribe((res) => {
        if (res) {
          this.alert.success('El Pedido fue borrado de la base de datos !');
          window.location.reload();
        } else {
          this.alert.error('El servidor se encontro con un problema');
        }
      });
    }
  };
  updatePedido = (pedido: any) => {
    let title = 'Cambiar Los Datos Del Pedido';
    console.log(pedido, 'pedido');
    let form = new FormGroup({
      id: new FormControl(pedido.id, Validators.required),
      address: new FormControl(pedido.address, Validators.required),
    });

    let subscription = this.simpleModalService
      .addModal(GenericFormgroupComponent, {
        form: form,
        formRules: this.formRulesUpdate,
        title: title,
      })
      .subscribe(async (data) => {
        if (data) {
          console.log(data, 'dataaaaaaaaaa');
          await this.commandService
            .insertUpdateCommand(data)
            .subscribe((res) => {
              if (res) {
                this.alert.success(
                  'Los datos del item fueron modificado en la base de datos !'
                );
                // window.location.reload();
              } else {
                this.alert.error('El servidor se encontro con un problema');
              }
            });

          //We get modal result
          subscription.unsubscribe();
          console.log('data del item', data);
        }
      });
    this.alert.warn('En Trabajo');
  };

  formRulesUpdate = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Shippping Id del item',
      label: 'Cambiar El Shipping Id Del Item !!!!!',
      formControl: 'id',
    },
    // {
    //   typeForm: 'input',
    //   typeInput: 'text',
    //   placeholder: 'Organization',
    //   label: 'Cambiar Organization',
    //   formControl: 'orga',
    // },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Ubicaci??n',
      label: 'Cambiar Ubicaci??n',
      formControl: 'address',
    },
  ];

  dateNow(onlyDate: Boolean) {
    var date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours() - 3,
      date.getUTCMinutes()
    );

    var finalDate = new Date(now_utc)
      .toISOString()
      .replace(/T/, ' ')
      .replace(/\..+/, '');
    finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate;

    return finalDate;
  }
  dateNowString(): string {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year}-${hours}:${minutes}`;
  }
}
