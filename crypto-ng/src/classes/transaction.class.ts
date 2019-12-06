export class Transaction {
	
	timestamp: any;
	payerAddr: any;
	payeeAddr: any;
	amount: number;

	constructor(timestamp, payerAddr, payeeAddr, amount) {
		this.timestamp	= timestamp;
		this.payerAddr	= payerAddr;
		this.payeeAddr	= payeeAddr
		this.amount = amount;
	}	

}