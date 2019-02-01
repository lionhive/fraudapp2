import { JetView } from "webix-jet";
import { fraud } from "../models/claimant";

export default class FraudView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "clean",
			width: 410,
			height: 300,
			rows: [
				// { template:_("Fraud"), type:"header", css:"webix_header chart_header" },
				{
					view: "datatable",
					columns: [
						{ id: "title", header: "Fraud", fillspace: true },
						{ id: "year", header: "" },
					],
					data: fraud,
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
