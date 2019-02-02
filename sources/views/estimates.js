import { JetView } from "webix-jet";
import { estimates } from "../models/claimant";

export default class EstimatesView extends JetView {
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
						// { id: "title", header: "Fraud", fillspace: true },
						{ id: "year", header: "", css:"title_col" },
					],
					data: estimates,
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
