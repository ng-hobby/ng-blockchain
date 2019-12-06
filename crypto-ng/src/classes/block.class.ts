import * as SHA256 from 'crypto-js/SHA256';
import { Transaction } from './transaction.class';

export class Block {

	timestamp: any;
	txns: Transaction[];
	previoushash: string = null;
	hash: string = null;
	nonce: number = 0;

	constructor( timestamp, txns, previoushash) {
		this.timestamp = timestamp;
		this.txns = txns;
		this.previoushash = previoushash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256( this. timestamp + JSON.stringify(this.txns) + this.previoushash + this.nonce).toString();
	}

	mineBlock(difficulty): Promise<any> {
		let promise = new Promise((resolve, reject) => {
			while( this.hash.substring(0, difficulty) != Array(difficulty + 1).join('0')) {
				this.nonce++;
				this.hash = this.calculateHash();
			}
			console.log("Block has been successfully mined (" + this.nonce + " iterations). hash is: " + this.hash);
			resolve();
		});
		return promise;
	}
}