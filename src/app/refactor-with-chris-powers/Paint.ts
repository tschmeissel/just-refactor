const MAX_USES = 8;

/**
 * https://www.youtube.com/watch?v=J18mLs-SRpI
 */
export class Paint {
	data: Array<any> = [];
	reportDone: boolean = false;
	inHeader: boolean = false;
	rowNum: number;
	report: string;
	
	constructor() {
		let encoded = localStorage.getItem("paint");
		if (!encoded) {
			encoded = '{}';
			localStorage.setItem("paint", encoded);
		}
		this.data = JSON.parse(encoded);
	};
	
	getPaintLeft(color, uses?) {
		if (!this.data[color]) {
			this.data[color] = MAX_USES;
			localStorage.setItem("paint", JSON.stringify(this.data));
		}
		if (uses) {
			this.data[color] = Math.max(this.data[color] - uses, 0);
			localStorage.setItem("paint", JSON.stringify(this.data));
		}
		return this.data[color];
	}
	
	generateReport() {
		this.reportDone = false;
		this.inHeader = true;
		this.rowNum = 0;
		this.report = "<table>";
		while (!this.reportDone) {
			this.report += this.getReportRow();
		}
		this.report += "</tbody></table>";
		return this.report;
	}
	
	getReportRow() {
		let output;
		if (this.inHeader) {
			output = "<thead><tr><th>Color</th><th>Remaining</th></tr></thead><tbody>";
			this.inHeader = false;
		} else {
			const color = Object.keys(this.data)[this.rowNum++];
			if (color) {
				const remaining = this.getPaintLeft(color);
				output = `<tr><td>${color}</td><td>${remaining}</td></tr>`
			} else {
				this.reportDone = true;
				output = "";
			}
		}
		return output;
	}
}
