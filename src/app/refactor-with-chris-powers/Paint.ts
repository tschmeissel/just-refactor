const MAX_USES = 8;

export class PaintStore {
	data: Array<any> = [];
	
	constructor() {
		// developer concern
		// set up persistence localStorage
		let encoded = localStorage.getItem("paint");
		if (!encoded) {
			encoded = '{}';
			localStorage.setItem("paint", encoded);
		}
		this.data = JSON.parse(encoded);
	}
	
	get(color) {
		return this.data[color] || MAX_USES;
	}
	
	set(color, value) {
		this.data[color] = value;
		localStorage.setItem("paint", JSON.stringify(this.data));
	}
}

export class Paint {
	reportDone: boolean = false;
	inHeader: boolean = false;
	rowNum: number;
	report: string;
	store: PaintStore;
	
	constructor(store) {
		this.store = store;
	}
	
	usePaint(color, uses) {
		let currentValue = this.store.get(color);
		let newValue = Math.max(currentValue - uses, 0);
		this.store.set(color, newValue);
	}
	
	// returning the units left
	getPaintLeft(color) {
		return this.store.get(color);
	}
	
	// business users
	generateReport() {
		// ???
		this.reportDone = false;
		this.inHeader = true;
		this.rowNum = 0;
		
		// building report HTML
		this.report = "<table>";
		while (!this.reportDone) {
			this.report += this.getReportRow();
		}
		this.report += "</tbody></table>";
		return this.report;
	}
	
	// get implies thats a query while the state of Paint is
	// changed at several places
	getReportRow() {
		let output;
		// generate header
		if (this.inHeader) {
			output = "<thead><tr><th>Color</th><th>Remaining</th></tr></thead><tbody>";
			this.inHeader = false;
		} else {
			// create a row
			const color = Object.keys(this.store.data)[this.rowNum++];
			if (color) {
				const remaining = this.getPaintLeft(color);
				output = `<tr><td>${color}</td><td>${remaining}</td></tr>`
			} else {
				// call it done
				this.reportDone = true;
				output = "";
			}
		}
		return output;
	}
}
