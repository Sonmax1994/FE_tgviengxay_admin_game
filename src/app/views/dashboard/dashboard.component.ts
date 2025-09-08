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
  FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
  BreadcrumbComponent, BreadcrumbItemComponent
} from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../../core/services/game.service';

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
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective,
    BreadcrumbComponent, BreadcrumbItemComponent
]
})
export class DashboardComponent implements OnInit {
  title: string = "";
  constructor(
    private _gameService: GameService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.onGetListGame();
    this.onGetlistMatch();

  }
  onGetListGame(): void {
    this._gameService.listGame().subscribe(res => {
      console.log(res);
      
    })
  }
  onGetlistMatch(): void {
     this._gameService.listMatch(1).subscribe(res => {
      console.log(res);
      
    })
  }
  onShowModalConfirm(index: number, game: string): void {    
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
  onShowModalListMatch(): void {
  }
}
