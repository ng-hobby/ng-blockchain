export class Wallet {
	
	address: string = '';
	balance: number = 0;

	assignWalletAddress( address ) {
		this.address = address;
		console.log("Assigned to this address " + this.address);
	}
}
