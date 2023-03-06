import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertService } from 'src/app/services/alert.service';
import { ClientService } from 'src/app/services/crud/client.service';
import { Shipping_itemsService } from 'src/app/services/crud/shipping_items.service';
import { GenericFormgroupComponent } from '../generic-formgroup/generic-formgroup.component';

@Component({
  selector: 'app-generic-order-details-card',
  templateUrl: './generic-order-details-card.component.html',
  styleUrls: ['./generic-order-details-card.component.scss'],
})
export class GenericOrderDetailsCardComponent implements OnInit {
  @Input() arrMainNgFor: any;
  @Input() actions: any;
  // simpleModalService: any;
  item: any;
  constructor(
    private clientService: ClientService,
    private alert: AlertService,
    private simpleModalService: SimpleModalService,
    private shipping_itemsService: Shipping_itemsService
  ) {}

  ngOnInit(): void {
    console.log(this.arrMainNgFor, 'my array ');
  }
  deleteShoeSol(item: any, i: any) {
    console.log(item, 'item');
    console.log(i, 'iii');
    if (item && i != 0) {
      this.shipping_itemsService.deleteShipping_items(item).subscribe((res) => {
        if (res) {
          this.alert.success(
            'Los datos del pedido fueron borrado en la base de datos !'
          );
          window.location.reload();
        } else {
          this.alert.error('El servidor se encontro con un problema');
        }
      });

      this.alert.warn('En Trabajo');
    } else {
      this.alert.error(
        'Si Queres Borrar Un Pedido Usas El Botton Borrar En La Linea Del Pedido'
      );
    }
  }

  /// Modificar la forma del anadir pedido con los nuevos datos
  ///
  updatePlantija = (item: any): void => {
    let title = 'Cambiar Los Datos Del Pedido';
    console.log(item, 'item');
    let form = new FormGroup({
      id: new FormControl(item.id, Validators.required),
      description: new FormControl(item.description, Validators.required),
      quantity: new FormControl(item.quantity, Validators.required),
      dimensions: new FormControl(item.dimensions, Validators.required),
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
          await this.shipping_itemsService
            .insertUpdateShipping_items(data)
            .subscribe((res) => {
              if (res) {
                this.alert.success(
                  'Los datos del item fueron modificado en la base de datos !'
                );
                window.location.reload();
              } else {
                this.alert.error('El servidor se encontro con un problema');
              }
            });

          //We get modal result
          subscription.unsubscribe();
          console.log('data del item', data);
        }
      });
  };

  formRulesUpdate = [
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Id del item',
      label: 'Cambiar El Id Del Item !!!!!',
      formControl: 'id',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Description',
      label: 'Cambiar La Description',
      formControl: 'description',
    },
    {
      typeForm: 'input',
      typeInput: 'number',
      placeholder: 'Cantidad',
      label: 'Cambiar Cantidad',
      formControl: 'quantity',
    },
    {
      typeForm: 'input',
      typeInput: 'text',
      placeholder: 'Dimension',
      label: 'Cambiar Las Dimensiones',
      formControl: 'dimensions',
    },
  ];
}
