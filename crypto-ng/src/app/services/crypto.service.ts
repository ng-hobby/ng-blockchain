import { Injectable } from '@angular/core';
import { Block } from '../../classes/block.class';
import { Blockchain } from '../../classes/blockchain.class';
import { Transaction } from '../../classes/transaction.class';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

	cryptochain = new Blockchain();
	unminedTxns: Transaction[] = [];

  	constructor() {

  		this.unminedTxns.push( new Transaction( Date.now(), "wallet-Alice", "wallet-Bob", 50 ) );
  		this.unminedTxns.push( new Transaction( Date.now(), "wallet-Bob", "wallet-Alice", 25 ) );

  		console.log("\n Mining a Block...");
  		this.cryptochain.mineCurrentBlock("wallet-Miner49r", this.unminedTxns).then(()=>{
  			console.log("\n Alice Balance: " + this.cryptochain.getAddressBalance("wallet-Alice"));
  			console.log("\n Bob Balance: " + this.cryptochain.getAddressBalance("wallet-Bob"));
  			console.log("\n Miner49r Balance: " + this.cryptochain.getAddressBalance("wallet-Miner49r"));
  		});

  	}
}
