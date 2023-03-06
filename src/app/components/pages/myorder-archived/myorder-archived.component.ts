import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/crud/client.service';
import { CommandService } from 'src/app/services/crud/command.service';
import { paramsService } from 'src/app/services/crud/params.service';
import { UserService } from 'src/app/services/crud/user.service';

@Component({
  selector: 'app-myorder-archived',
  templateUrl: './myorder-archived.component.html',
  styleUrls: ['./myorder-archived.component.scss'],
})
export class MyorderArchivedComponent implements OnInit {
  user: any;
  arrHeader = [
    { name: 'Estado', key: 'name', obj: 'status' },
    { name: 'Tracking Number (shippingId)', key: 'id' },
    { name: 'Ubicacion', key: 'address' },
    { name: 'Feche De Primer Escaneo', key: 'creationDateDisplay' },
    { name: 'Feche De Llegada Estimada', key: 'estimatedDeliveryDateDisplay' },
    { name: 'Feche De Entrega', key: 'finishDateDisplay' },
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
  paramsClient: any;
  constructor(
    private commandService: CommandService,
    private clientService: ClientService,
    private simpleModalService: SimpleModalService,
    private userService: UserService,
    private alert: AlertService,
    private params: paramsService
  ) {}

  async ngOnInit() {
    this.paramsClient = await JSON.parse(localStorage.getItem('user')).params;
    await this.loadCommand();
  }
  async loadCommand() {
    console.log(' this.paramsClient.id ', this.paramsClient);
    let arrayOfSenderId = [];
    this.paramsClient.forEach((el) => {
      arrayOfSenderId.push(el.id);
    });

    await this.commandService
      .findByCommand({
        in: { sender_id: arrayOfSenderId, statusId: [4] },
        relations: ['status', 'shipping_items', 'user'],
      })
      .subscribe((res) => {
        this.arrMainNgFor = res;
        console.log(this.arrMainNgFor, 'arrMainNgFor my order ');
      });
  }
}
