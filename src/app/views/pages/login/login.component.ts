import { Component,OnInit } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective]
})
export class LoginComponent implements OnInit {
  user = {
    userName: '',
    password: ''
  }

  constructor(private _router: Router, private _authService: AuthService,
    private _toastr: ToastrService) { }

  ngOnInit(): void {

  }

  initLogin() {
    if(this.validateBeforLogin()) {
      this.login();
    }
  }

  validateBeforLogin() {
    if(!this.user.userName || this.user.userName == '') {
      this._toastr.error('Vui lòng nhập tên đăng nhập');
      return false;
    }
    if(!this.user.password || this.user.password == '') {
      this._toastr.error('Vui lòng nhập mật khẩu');
      return false;
    }
    return true;
  }

  login() {
    this._authService.login(this.user).subscribe(res => {
      this._router.navigate(['game']);
    })
  }
}
