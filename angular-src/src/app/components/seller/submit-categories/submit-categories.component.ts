import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SellerService } from '../../../services/seller.service';
import { BP_PREFIX } from 'blocking-proxy/built/lib/blockingproxy';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-submit-categories',
  templateUrl: './submit-categories.component.html',
  styleUrls: ['./submit-categories.component.css']
})
export class SubmitCategoriesComponent implements OnInit {
  private readonly notifier: NotifierService;
  // Temp codes for MVP - Kurgan
  codes = [
    { code: 78965422, name: 'Jewelry', image: 'https://picsum.photos/200', checked: false },
    { code: 78965423, name: 'Necklaces (Jewelry)', image: 'https://picsum.photos/200', checked: false },
    { code: 78965424, name: 'Rings (Jewelry)', image: 'https://picsum.photos/200', checked: false },
    { code: 78965425, name: 'Earrings (Jewelry)', image: 'https://picsum.photos/200', checked: false },
    { code: 68977451, name: 'Dolls', image: 'https://picsum.photos/200', checked: false },
    { code: 67887941, name: 'Sculptures', image: 'https://picsum.photos/200', checked: false },
    { code: 62145331, name: 'Scarves', image: 'https://picsum.photos/200', checked: false },
    { code: 54887921, name: 'Blankets', image: 'https://picsum.photos/200', checked: false },
    { code: 52871151, name: 'Socks', image: 'https://picsum.photos/200', checked: false },
    { code: 50360051, name: 'Pencils', image: 'https://picsum.photos/200', checked: false },
    { code: 49605401, name: 'Painting', image: 'https://picsum.photos/200', checked: false },
    { code: 49605402, name: 'Oil (Painting)', image: 'https://picsum.photos/200', checked: false },
    { code: 49605403, name: 'Watercolor (Painting)', image: 'https://picsum.photos/200', checked: false },
    { code: 49605404, name: 'Acrlyic (Painting)', image: 'https://picsum.photos/200', checked: false }
  ];
  submitLabels: String[];
  codeArray: Number[];
  code: Number;
  codeList: [Number];
  None: Boolean;
  codeNames: any[];
  first_name: String;
  last_name: String;
  street_address: String;
  city: String;
  country: String;
  state_province: String;
  postal_code: String;
  description: any;
  buttonText: String = 'Subscribe to any products on Requiren';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  first: Boolean;
  second: Boolean;
  third: Boolean;

  constructor(private sellerService: SellerService,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private router: Router,
    private _formBuilder: FormBuilder) { this.notifier = notifierService;}

  // On initialization process of the webpage
  ngOnInit() {
    // for the steps
    this.first = false;
    this.second = false;
    this.third = false;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.submitLabels = [];
    this.codeArray = [];
    this.None = false;
    // Get seller codes
    this.sellerService.getCode().subscribe((data: any) => {
      if (data.success) {
        if (data.codeList.length === 0) { // Seller does not have any codes yet
        } else {
          this.codeArray = data.codeList;
        }
      }
    });
  }

  /* // Checking which checkboxes are checked and upload the code - By: Andre Wijaya
  AddCode() {
    // Jewelry
    var element = <HTMLInputElement> document.getElementById('78965422');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Necklaces (Jewelry)
    var element = <HTMLInputElement> document.getElementById('78965423');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Rings (Jewelry)
    var element = <HTMLInputElement> document.getElementById('789654224');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Earrings (Jewelry)
    var element = <HTMLInputElement> document.getElementById('78965425');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Dolls
    var element = <HTMLInputElement> document.getElementById('68977451');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Sculptures
    var element = <HTMLInputElement> document.getElementById('67887941');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Scarves
    var element = <HTMLInputElement> document.getElementById('62145331');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Blankets
    var element = <HTMLInputElement> document.getElementById('54887921');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Socks
    var element = <HTMLInputElement> document.getElementById('52871151');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Pencils
    var element = <HTMLInputElement> document.getElementById('50360051');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Painting
    var element = <HTMLInputElement> document.getElementById('49605401');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Oil (Painting)
    var element = <HTMLInputElement> document.getElementById('49605402');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Watercolor (Painting)
    var element = <HTMLInputElement> document.getElementById('49605403');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }

    // Acrlyic (Painting)
    var element = <HTMLInputElement> document.getElementById('49605404');
    if (element.checked === true) {
      this.code = Number(element.value);
      this.uploadCode();
    }
  } */

  AddCode() {
    const code = {
      codes: this.codeArray
    };

    this.sellerService.setNewCode(code).subscribe((data: any) => {
      if (data.success) {
        this.notifier.notify('success', 'Your New Code was submitted!');
      } else {
        this.notifier.notify('error', data.msg);
      }
    });
  }

  labelButton() {
    var btnTxt = 'Subscribe to  ';
    var slsize = this.submitLabels.length;
    //console.log(this.submitLabels[0]);
    for (var n = 0; n < slsize; n++) {
      if (slsize <= 3) {
        btnTxt = btnTxt + this.submitLabels[n];
        if (n < (slsize - 1)) {
          btnTxt = btnTxt + ', ';
        } else {
          btnTxt = btnTxt + ' ';
        }
      } else {
        if (n < 2) {
          btnTxt = btnTxt + this.submitLabels[n] + ', ';
        }
        if (n === 2) {
          btnTxt = btnTxt + this.submitLabels[n] + ' ';
        }
      }
    }
    var rem = slsize - 3;
    var remd = rem.toString();
    if (slsize > 3) {
      btnTxt = btnTxt + '(+' + remd + ' more) ';
    }
    this.buttonText = btnTxt + ' on Requiren';
  }

  onCheckboxChange(option, event) {
    if (event.target.checked) {
      this.codeArray.push(option.code);
      this.submitLabels.push(option.name);
      this.labelButton();
    } else {
      for (var i = 0; i < this.codes.length; i++) {
        if (this.codeArray[i] === option.code) {
          this.codeArray.splice(i, 1);
          this.submitLabels.splice(i, 1);
          this.labelButton();
        }
      }
    }
  }

  OnSubmitClickBtn() {
    const billingAddress = {
      first_name: this.first_name,
      last_name: this.last_name,
      street_address: this.street_address,
      city: this.city,
      country: this.country,
      state_province: this.state_province,
      postal_code: this.postal_code,
    };

    const desc = {
      description: this.description
    };

    const code = {
      codes: this.codeArray
    };

    // adding code
    this.sellerService.setNewCode(code).subscribe((data2: any) => {
      if (data2.success) {
        this.notifier.notify('success', 'Your New Code was submitted!');
        // setting description
        this.sellerService.setDescription(desc).subscribe((data: any) => {
          if (data.success === true) { // if the data succeed to be posted
            // setting billing address connect it to the service for back-end process
            this.sellerService.setBillingAddress(billingAddress).subscribe((data1: any) => {
              if (data1.success) { // if the data succeed to be posted
                this.router.navigate(['/seller']);
              } else { // if it fails
                this.notifier.notify('error', data1.msg);
              }
            });
          } else { // if it fails
            this.notifier.notify('error', data.msg);
          }
        });
      } else {
        this.notifier.notify('error', data2.msg);
      }
    });
  }

    // Tab first configuration
    currentTab = 'step1';

    // when the user changes tabs
    step1(currentTab) {
      this.currentTab = currentTab;
    }
    step2(currentTab) {
      this.currentTab = currentTab;
    }
    step3(currentTab) {
      this.currentTab = currentTab;
    }

  }
