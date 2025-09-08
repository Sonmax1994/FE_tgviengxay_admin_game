import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  AvatarComponent,
  ContainerComponent,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  SidebarToggleDirective,  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { IconDirective } from '@coreui/icons-angular';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, RouterLink, NgTemplateOutlet, DropdownComponent, DropdownToggleDirective, AvatarComponent, DropdownMenuDirective, DropdownItemDirective,
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  FormsModule,
  ]
})
export class DefaultHeaderComponent extends HeaderComponent {
  pwObject = {
    currentPassword: '',
    newPassword: '',
    newPassword_confirmation: ''
  };
  isModalVisible = false;
  constructor(
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {
    super();
  }

  sidebarId = input('sidebar1');

  initChangePW() {
    this.pwObject = {
      currentPassword: '',
      newPassword: '',
      newPassword_confirmation: ''
    };
    this.isModalVisible = true
  }
  submitChangePW(): void {
    if(this.validate()) {
      this.changePassword();
    }
  }
  validate() {
    if(!this.pwObject.currentPassword || this.pwObject.currentPassword == '') {
      this._toastr.error('Vui lòng nhập mật khẩu hiện tại');
      return false;
    }
    if(!this.pwObject.newPassword || this.pwObject.newPassword == '') {
      this._toastr.error('Vui lòng nhập mật khẩu mới');
      return false;
    }
    if(!this.pwObject.newPassword_confirmation || this.pwObject.newPassword_confirmation == '') {
      this._toastr.error('Vui lòng xác nhập lại mật khẩu mới');
      return false;
    }
    if(this.pwObject.newPassword_confirmation && this.pwObject.newPassword && this.pwObject.newPassword_confirmation != this.pwObject.newPassword) {
      this._toastr.error('Mật khẩu xác nhận không khớp');
      return false;
    }
    return true;
  }

  changePassword() {
    this._authService.changePassword(this.pwObject).subscribe(res => {
      this._toastr.success('Đổi mật khẩu thành công. Vui lòng đăng nhập lại');
      this.isModalVisible = false;
      this._authService.logout();
    })
  }
  logout() {
    this._authService.logout();
  }
}
