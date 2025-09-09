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
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    BreadcrumbComponent, BreadcrumbItemComponent,
    UpperCasePipe,
    CommonModule,
    FormsModule
]
})
export class DashboardComponent implements OnInit {
  title: string = "";
  listGames: any[] = [];
  listMatch: any[] = [];
  selectedGame: any = null;
  selectedMatchId = 0;
  selectedRoomId = 0;
  resultObj = {
    winner: null
  };
  isModalVisibleResult = false;
  isModalVisibleFinishOrStop = false;
  isStopSession = false;
  isModalVisibleNewSession = false;
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
      this.listGames = res.data;
    })
  }
  onGetlistMatch(): void {
     this._gameService.listMatch(1).subscribe(res => {
      this.listMatch = res.data;
    })
  }
  onRenderStatusClass(status: number): string {
    switch (status) {
      case 1:
        return "status";
      case 2:
        return "status status-processing";
      case 3:
        return "status status-stop";
      default:
        return "status status-finish";
    }
  }
  onRenderGameStt(status: number): string {
    switch (status) {
      case 1:
        return "Đang chờ xử lý";
      case 2:
        return "Đang diễn ra";
      case 3:
        return "Đá khóa không nhận cược";
      default:
        return "Đã kết thúc phiên";
    }
  }
  onShowModalConfirm(index: number, gameType: number): void {    
    this.isModalVisibleFinishOrStop = true;
    this.selectedRoomId = gameType == 1 ? 1 : 2;
    this.selectedMatchId = 0;
    if (index === 1) {
      this.isStopSession = false;
      this.title = "NGƯỜI CHƠI SẼ KHÔNG THỂ ĐẶT CƯỢC CHO GAME NÀY";
    } else {
      this.title = "PHIÊN CƯỢC HIỆN TẠI SẼ BỊ ĐÓNG";
      this.isStopSession = true;
    }
  }
  onConfirmFinishOrStop(): void {
    if (!this.selectedMatchId) {
      this._toastr.error("Vui lòng chọn trận đấu");
      return;
    }
    const redObj = {
      roomId: this.selectedRoomId,
      matchId: this.selectedMatchId
    }
    if (this.isStopSession) {
      this._gameService.finishSession(redObj).subscribe(res => {
        this._toastr.success("Đã đóng phiên cược");
        this.isModalVisibleFinishOrStop = false;
        this.onGetListGame();
        this.onGetlistMatch();
      })
    } else {
      this._gameService.lockSession(redObj).subscribe(res => {
        this._toastr.success("Đã ngưng nhận cược");
        this.isModalVisibleFinishOrStop = false;
        this.onGetListGame();
        this.onGetlistMatch();
      })
    }
  }
  onShowModalCurrentSession(gameType: number): void {
    console.log(gameType);
    
  }
  onShowModalResult(gameType: number): void {
    this.isModalVisibleResult = true;
    this.selectedRoomId = gameType == 1 ? 1 : 2;
    this.selectedMatchId = 0;
    this.resultObj = {
      winner: null
    };
  }
  onSetResult(): void {
    if (!this.selectedMatchId || this.resultObj.winner === null) {
      this._toastr.error("Vui lòng chọn trận đấu và kết quả");
      return;
    }
    this._gameService.gameResult({
      ...this.resultObj,
      roomId: this.selectedRoomId,
      matchId: this.selectedMatchId
    }).subscribe(res => {
      this._toastr.success("Cập nhật kết quả thành công");
      this.isModalVisibleResult = false;
      this.onGetListGame();
      this.onGetlistMatch();
    })
  }
  newSession = {
    chickenBlue: "",
    chickenRed: "",
    urlLiveStream: "",
    matchName: ""
  }
  onShowModalNewSession(gameType: number): void {
    this.isModalVisibleNewSession = true;
    this.selectedRoomId = gameType == 1 ? 1 : 2;
    this.newSession = {
      chickenBlue: "",
      chickenRed: "",
      urlLiveStream: "",
      matchName: ""
    }
  }
  onCreateNewSession(): void {    
    if (!this.newSession.chickenBlue || !this.newSession.chickenRed || !this.newSession.urlLiveStream || !this.newSession.matchName) {
      this._toastr.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    this._gameService.createSession({
      roomId: this.selectedRoomId,
      ...this.newSession
    }).subscribe(res => {
      this._toastr.success("Tạo phiên cược thành công");
      this.isModalVisibleNewSession = false;
      this.onGetListGame();
      this.onGetlistMatch();
    })
  }
  onShowModalListMatch(): void {
  }
}
