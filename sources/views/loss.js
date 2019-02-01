import { JetView } from "webix-jet";
import { loss } from "../models/claimant";

export default class LossView extends JetView {
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
						{ id: "title", header: "Loss Estimate", fillspace: true },
						{ id: "year", header: "" },
					],
					data: loss,
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
