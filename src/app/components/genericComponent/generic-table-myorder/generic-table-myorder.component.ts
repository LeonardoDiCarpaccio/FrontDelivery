import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CommandService } from 'src/app/services/crud/command.service';

@Component({
  selector: 'app-generic-table-myorder',
  templateUrl: './generic-table-myorder.component.html',
  styleUrls: ['./generic-table-myorder.component.scss'],
})
export class GenericTableMyorderComponent implements OnInit {
  @Input() arrMainNgFor: any;
  @Input() arrHeader: any;
  @Input() actions: any;
  @Input() status: any;
  @Input() colorBtn: any;

  @Input() searchBar: any;
  @Input() filter: any;
  @Input() alertMsgFilterNoMatch: string = '';
  @Input() statusStored: any;

  display: boolean = false;
  copyArrNgFor: any = [];
  searchText = '';
  arrIndexFilter: any[] = [];
  availableBtn: boolean = false;
  beforeBtn: any;
  beforeDisplayDetails: any;
  Show: boolean = false;
  statusStoredHisto: any;
  id: any;
  commandDetails: any;
  constructor(
    private alert: AlertService,
    private commandService: CommandService
  ) {}

  ngOnInit(): void {
    this.statusStoredHisto = this.statusStored;
    this;
    console.log(this.status, 'status');
    this.copyArrNgFor = this.arrMainNgFor.slice();
    console.log(this.arrHeader, 'arrHeader');
    console.log('this.arrMainNgFormmmmmmmmmm', this.arrMainNgFor);
  }

  // toggleFunction(node) {
  //   if (this.beforeBtn != node.id && this.availableBtn) {
  //     this.arrMainNgFor.find((a) =>
  //       a.id == this.beforeBtn ? (a.isSelected = false) : null
  //     );
  //     node.isSelected = true;
  //     this.availableBtn = true;
  //   } else {
  //     this.availableBtn = !this.availableBtn;
  //     if (!this.availableBtn) {
  //       node.isSelected = false;
  //     } else {
  //       node.isSelected = true;
  //     }
  //   }
  //   this.statusStored = this.statusStoredHisto;

  //   this.beforeBtn = node.id;
  // }
  // storeStatus(input: any) {
  //   // this.statusStored = input.target.value;
  //   if (input.target.value == this.statusStored) {
  //     this.statusStored = 0;
  //   } else {
  //     this.statusStored = input.target.value;
  //   }

  //   console.log(input.target.value, 'value');
  //   console.log(this.statusStored, ' this.statusStored');
  // }

  // async updateStatus(command: any) {
  //   console.log(this.statusStored, 'this.statusStored choosed');
  //   if (this.statusStored == 0) {
  //     this.alert.warn(
  //       'No Se Puede Guardar Un Pedido Sin Estado De Processamiento'
  //     );
  //   } else {
  //     let update = {
  //       id: command.id,
  //       clientId: command.clientId,
  //       creationDate: command.creationDate,
  //       finishDate: this.statusStored == 4 ? this.dateNow(true) : null,
  //       finishDateDisplay: this.statusStored == 4 ? this.dateNowString() : null,
  //       Price: command.price,
  //       statusId: this.statusStored,
  //     };
  //     console.log(update, 'update');
  //     this.commandService.insertUpdateCommand(update).subscribe((res) => {
  //       if (res) {
  //         this.alert.success(
  //           'El Estado del pedido fueron modificado en la base de datos !'
  //         );
  //         window.location.reload();
  //       } else {
  //         this.alert.error('El servidor se encontro con un problema');
  //       }
  //     });
  //   }
  //   this.toggleFunction(command);
  // }

  displayDetails(node) {
    console.log(node, 'node details');
    console.log(this.display, 'this.display before');

    if (this.beforeDisplayDetails != node.id && this.display) {
      this.arrMainNgFor.find((a) =>
        a.id == this.beforeDisplayDetails ? (a.selectedItem = false) : null
      );
      node.selectedItem = true;
      this.display = true;
    } else {
      this.display = !this.display;
      if (!this.display) {
        node.selectedItem = false;
      } else {
        node.selectedItem = true;
      }
    }

    this.commandDetails = node;
    this.beforeDisplayDetails = node.id;
    if (this.commandDetails == null) {
      this.alert.info('Este Pedido No tiene Item !!');
    }
    console.log(this.display, 'this.display after');
    console.log(this.commandDetails, 'this.commandDetails');
  }

  filterFunction(filterValue: any, item: any, indexFilter: any) {
    // first case, it's the first time we filter so it's just filtering on the copyArray
    if (this.arrIndexFilter.length == 0) {
      this.arrMainNgFor = this.copyArrNgFor.filter(
        (el: any) => el[item.keyNgForFilter] == filterValue.target.value
      );
      // testing if key option is an array of obj, if it's an array of string item.filterValue == filterValue.target.value Otherwise we use a find with el[item.keyOptionFilter]
      item.filterValue =
        item.keyOptionFilter == ''
          ? filterValue.target.value
          : item.option.find(
              (el: any) => el[item.keyOptionFilter] == filterValue.target.value
            )[item.optionDisplaykey];
      //indexFilter deserve to store which filter which have been already used
      this.arrIndexFilter.push(indexFilter);
    } else {
      // second case, it mean that we're filtering an array already filtered with new conditions, the filter is not on the copyArray but on the iterating ngfor one
      this.arrMainNgFor = this.arrMainNgFor.filter(
        (el: any) => el[item.keyNgForFilter] == filterValue.target.value
      );
      // if the length of the iterating ngfor array == 0, we've to remove all filtr and make it equal to the copyArray
      if (this.arrMainNgFor.length == 0) {
        //we reset those values which are only for display logic
        this.filter.forEach((element: any, index: any) => {
          element.filterValue = '';
          element.filterNgModelValue = '';
          // we force the select to come back to the "start state"
          let a = document.getElementById('select' + index) as HTMLInputElement;
          a.value = '';
        });
        this.arrIndexFilter = [];
        this.arrMainNgFor = this.copyArrNgFor.slice();
        // we notify the user that those filter correspond to no one row
        this.alert.info(this.alertMsgFilterNoMatch);
      } else {
        // the ngFor array still contain value, we just do the same job as upper to get the filter value
        item.filterValue =
          item.keyOptionFilter == ''
            ? filterValue.target.value
            : item.option.find(
                (el: any) =>
                  el[item.keyOptionFilter] == filterValue.target.value
              )[item.optionDisplaykey];
        this.arrIndexFilter.push(indexFilter);
      }
    }
  }

  removeFilter(item: any, indexFilter: any) {
    // in any case, we reset those value
    item.filterValue = '';
    item.filterNgModelValue = '';
    // we remove from the array of filter the current one
    this.arrIndexFilter = this.arrIndexFilter.filter(
      (el: any) => el != indexFilter
    );
    // if filter array length == 0, that mean that we can come back to the initial array
    if (this.arrIndexFilter.length == 0) {
      this.arrMainNgFor = this.copyArrNgFor.slice();
    } else {
      // arrFilter will be the store of filtered value, at the end arrMainNgFor will be equal to it
      let arrFilter: any[] = [];
      // we iterate on the array which store wich filter are still active
      this.arrIndexFilter.forEach((filter: any, index: any) => {
        let temp = [];
        // index zero mean that we filter in the copyNgForArray
        if (index == 0) {
          temp = this.copyArrNgFor.filter(
            (el: any) =>
              el[this.filter[filter].keyNgForFilter] ==
              this.filter[filter].filterNgModelValue
          );
        } else {
          // index>0 mean that we need to filter "ourselves"
          temp = arrFilter.filter(
            (el: any) =>
              el[this.filter[filter].keyNgForFilter] ==
              this.filter[filter].filterNgModelValue
          );
        }
        // to finish we push values to arrFilter
        // if it's the last iteration, the filter is done, and we can make arrFilter = temp
        if (index == this.arrIndexFilter.length - 1) {
          arrFilter = temp.slice();
        } else {
          //while it's not the last we push filtered values in the arrFilter
          temp.forEach((item: any) => {
            arrFilter.find((element: any) => element.id == item.id) == undefined
              ? arrFilter.push(item)
              : null;
          });
        }
      });
      //finally job is done, arrMainNgFor = arrFilter
      this.arrMainNgFor = arrFilter.slice();
    }
  }

  dateNow(onlyDate: Boolean) {
    var date = new Date();
    var now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours() - 3,
      date.getUTCMinutes(),
      date.getUTCSeconds()
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
