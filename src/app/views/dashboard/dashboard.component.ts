import { Component, OnInit } from '@angular/core';
import {
  ColComponent,
  RowComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  ButtonDirective,
  TableDirective,
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective
} from '@coreui/angular';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports: [
    RowComponent, 
    ColComponent,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalToggleDirective,
    ButtonDirective,
    TableDirective,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective
]
})
export class DashboardComponent implements OnInit {
  title: string = "";
  ngOnInit(): void {
  }
  onShowModalConfirm(index: number, game: string): void {
    console.log(game);
    
    if (index === 1) {
      this.title = "NGƯỜI CHƠI SẼ KHÔNG THỂ ĐẶT CƯỢC CHO GAME NÀY";
    } else {
      this.title = "PHIÊN CƯỢC HIỆN TẠI SẼ BỊ ĐÓNG";
    }
  }
  onShowModalCurrentSession(game: string): void {
    console.log(game);
    
  }
  onShowModalResult(game: string): void {
    console.log(game);
    
  }
  onShowModalNewSession(game: string): void {
    console.log(game);
    
  }
}
