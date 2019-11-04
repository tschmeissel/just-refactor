const MAX_USES = 8;

export class Paint {
	data: Array<any> = [];
	reportDone: boolean = false;
	inHeader: boolean = false;
	rowNum: number;
	report: string;
	
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
	
	usePaint(color, uses) {
		// initializing new color
		if (!this.data[color]) {
			this.data[color] = MAX_USES;
			localStorage.setItem("paint", JSON.stringify(this.data));
		}
		this.data[color] = Math.max(this.data[color] - uses, 0);
		localStorage.setItem("paint", JSON.stringify(this.data));
	}
	
	// returning the units left
	getPaintLeft(color) {
		return this.data[color];
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
	
	getReportRow() {
		let output;
		// generate header
		if (this.inHeader) {
			output = "<thead><tr><th>Color</th><th>Remaining</th></tr></thead><tbody>";
			this.inHeader = false;
		} else {
			// create a row
			const color = Object.keys(this.data)[this.rowNum++];
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
