import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../../services/seller.service';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.component.html',
  styleUrls: ['./seller-account.component.css']
})
export class SellerAccountComponent implements OnInit {

  seller: Object;

  constructor(private sellerService: SellerService) { }

  ngOnInit() {
    this.sellerService.getSellerProfile().subscribe((profile: any) => {
      this.seller = profile.data;
      console.log(profile.data.account_type);
    },
      err => {
        console.log(err);
        return false;
      });
  }

  editFunction(): void {
    (<HTMLInputElement>document.getElementById('fName')).disabled = false;
    (<HTMLInputElement>document.getElementById('lName')).disabled = false;
    (<HTMLInputElement>document.getElementById('eAddress')).disabled = false;
    (<HTMLInputElement>document.getElementById('saveBtn')).disabled = false;
    (<HTMLInputElement>document.getElementById('editBtn')).disabled = true;
    (<HTMLInputElement>document.getElementById('verify')).hidden = false;
    (<HTMLInputElement>document.getElementById('newPass')).hidden = false;
}

saveFunction(): void {
  const newPass = (<HTMLInputElement>document.getElementById('newPwd')).value;
  const confirm = (<HTMLInputElement>document.getElementById('verifyPwd')).value;
  if ((newPass === confirm) && (<HTMLInputElement>document.getElementById('verifyPwd')).value !== '') {
    (<HTMLInputElement>document.getElementById('pwd')).value = (<HTMLInputElement>document.getElementById('newPwd')).value;
    (<HTMLInputElement>document.getElementById('fName')).disabled = true;
    (<HTMLInputElement>document.getElementById('lName')).disabled = true;
    (<HTMLInputElement>document.getElementById('eAddress')).disabled = true;
    (<HTMLInputElement>document.getElementById('pwd')).disabled = true;
    (<HTMLInputElement>document.getElementById('saveBtn')).disabled = true;
    (<HTMLInputElement>document.getElementById('editBtn')).disabled = false;
    (<HTMLInputElement>document.getElementById('verify')).hidden = true;
    (<HTMLInputElement>document.getElementById('newPass')).hidden = true;
    (<HTMLInputElement>document.getElementById('newPwd')).value = '';
    (<HTMLInputElement>document.getElementById('verifyPwd')).value = '';
    (<HTMLInputElement>document.getElementById('errorMessage')).hidden = true;
    (<HTMLInputElement>document.getElementById('verifyPwd')).style.backgroundColor = 'White';
    (<HTMLInputElement>document.getElementById('newPwd')).style.backgroundColor = 'White';
  } else {
    (<HTMLInputElement>document.getElementById('errorMessage')).hidden = false;
    (<HTMLInputElement>document.getElementById('verifyPwd')).style.backgroundColor = 'Red';
    (<HTMLInputElement>document.getElementById('newPwd')).style.backgroundColor = 'Red';
  }
}

}
