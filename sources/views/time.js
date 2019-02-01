import { JetView } from "webix-jet";
import { time } from "../models/claimant";

export default class TimeView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "clean",
			width: 410,
			height: 300,
			shadow: 1,
			rows: [
				// { template:_("Claimant"), type:"header", css:"webix_header chart_header" },
				{
					view: "datatable",
					columns: [
						{ id: "title", header: "Investigator", fillspace: true },
						{ id: "year", header: "" },
					],
					data: time,
				},

				{
					localId: "hours",
					view: "chart",
					type: "donut",
					value: "#hours#",
					color: "#color#",
					innerRadius: 64,
					shadow: 1,
					lineColor: obj => obj.color,
					tooltip: {
						template: "#hours#"
					},
					legend: {
						width: 100,
						align: "right",
						valign: "middle",
						template: obj => _(obj.activity),
						marker: {
							type: "round", width: 7, height: 8
						}
					},
					padding: {
						top: 10, bottom: 20
					}
				}
			]
		};
	}
	init(view) {
		this.on(this.app, "person:select", person => {
			view.queryView({ view: "chart" }).parse(webix.copy(person.hours));
		});
	}
}
