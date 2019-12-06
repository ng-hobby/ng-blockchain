import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Wallet } from '../classes/wallet.class';
import { Blockchain } from '../classes/blockchain.class';
import { Transaction } from '../classes/transaction.class';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // walletAdressForm: FormGroup = new FormGroup({
  //   walletAdress: new FormControl()
  // });

  wallet: Wallet;
  walletAdressForm = '';
  blockChain: Blockchain;
  state: boolean;
  balance = 0;

  reciverWallet:string = '';
  reciverCoin:string;

  constructor(private cryptoService: CryptoService, private snackBar: MatSnackBar) {
    // this.walletAdressForm = fb.group({
    //   walletAdress: ['', Validators.required]
    // });
  	this.blockChain = cryptoService.cryptochain;
  	this.state = cryptoService.cryptochain.isChainValid();
    this.wallet = new Wallet();
  }

  assignWalletAddress() {
    this.wallet.assignWalletAddress(this.walletAdressForm);
    let message = 'Wallet Assigned to ' + this.walletAdressForm;
    let snackBarRef = this.snackBar.open( message, 'Close', { duration: 2000} );
    // console.log(this.walletAdressForm);
  }

  getCurrentBalance() {
    this.balance = this.blockChain.getAddressBalance(this.wallet.address);
    console.log("Get current balance...")
  }

  sendTransaction() {
    let txn: Transaction;
    txn = new Transaction(
      Date.now(),
      this.wallet.address,
      this.reciverWallet,
      parseInt(this.reciverCoin)
    );
    this.blockChain.reciveTransaction(txn);
  }
}
