import * as SHA256 from 'crypto-js/SHA256';
import { Block } from './block.class';
import { Transaction } from './transaction.class';

export class Blockchain {

	chain: Block[] = [];
	difficulty: number = 3;
	miningReward: number = 50;
	registeredAddress:string[] = [];

	constructor() {
		this.createGenesisBlock();
		this.registeredAddress = ["wallet-Alice", "wallet-Bob", "wallet-Charlie", "wallet-Miner49r"];
		this.airdropCoin(100);
	}

	airdropCoin(coin) {
		let airdropTxns: Transaction[] = [];
		for (const addr of this.registeredAddress) {
			let txn = new Transaction( Date.now(), "mint", addr, coin);
			airdropTxns.push(txn);
		}
		this.mineCurrentBlock( "wallet-Miner49r", airdropTxns );
	}

	createGenesisBlock() {
		let txn = new Transaction( Date.now(), 'mint', 'genesis', 0 );
		let block = new Block( Date.now(), [txn], '0');
		this.chain.push(block);
	}

	getLatestBlock() {
		return this.chain[ this.chain.length - 1 ];
	}

	mineCurrentBlock(minerAddr:string, transactions: Transaction[]): Promise<any> {
		let validatedTxns: Transaction[] = [];
		for (const txn of transactions) {
			if ( txn.payerAddr === "mint" || this.validateTransaction(txn)) {
				validatedTxns.push(txn);
			}
		}

		console.log("Validated transaction length is: " + validatedTxns.length);

		validatedTxns.push(new Transaction( Date.now(), 'Mint', minerAddr, this.miningReward ))
		let promise = new Promise((resolve, reject) => {
			let block = new Block( Date.now(), validatedTxns, this.getLatestBlock().hash);
			block.mineBlock(this.difficulty).then( ()=> {
				console.log( "current block successfully mined...");
				this.chain.push(block);
				resolve();
			});
		});
		return promise;
	}

	validateTransaction (txn: Transaction) {
		let payerAddr = txn.payeeAddr;
		let balance = this.getAddressBalance( payerAddr );
		if ( balance >= txn.amount ) {
			return true;
		}
		else {
			return false;
		}
	}

	getAddressBalance( addr ) {

		let balance = 0;
		for ( const block of this.chain) {
			for ( const txn of block.txns) {
				if ( txn.payerAddr === addr ) {
					balance -= txn.amount;
				}
				if ( txn.payeeAddr === addr ) {
					balance += txn.amount;
				}
			}
		}

		return balance;
	}

	isChainValid() {
		for(let i=1; i< this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			//validate data Integrity
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			//validate hash chain link
			if (currentBlock.previoushash !== previousBlock.hash) {
				return false;
			}
		}

		//all good, no manipulated data or link
		return true;
	}

	reciveTransaction(txn: Transaction) {
		this.mineCurrentBlock("wallet-Miner49r", [txn]);
	}
}