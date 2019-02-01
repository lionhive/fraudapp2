import { JetView } from "webix-jet";
import { claimant, insured } from "../models/claimant";

export default class ClaimantView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "clean",
			width: 410,
			height: 300,
			rows: [
				// { template:_("Claimant"), type:"header", css:"webix_header chart_header" },
				{
					view: "datatable",
					columns: [
						{ id: "title", header: "Claimant", fillspace: true },
						{ id: "year", header: "" },
					],
					data: claimant,
				},
				{
					view: "datatable",
					columns: [
						{ id: "title", header: "Insured", fillspace: true },
						{ id: "year", header: "" },
					],
					data: insured,
				},
			]
		};
	}
	init(view) {
		this.on(this.app, "person:select", person => {
			view.queryView({ view: "chart" }).parse(webix.copy(person.hours));
		});
	}
}
