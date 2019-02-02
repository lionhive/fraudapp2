import { JetView } from "webix-jet";
import { fraud, fraud_settle } from "../models/claimant";

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
					subrow:"Risk: #value#",
					columns: [
						{ id: "title", header: "Fraud Analytics", fillspace: true, css:"title_col",
						   template:"{common.subrow()} #title#"},
						{
							id: "value", header: "Risk", sort: "int", // fillspace: 2.5,
							template: function (obj) {
								var html = "<div class='progress_bar_element'>";
								html += "<div title='" + (parseInt(obj.value * 10, 10) + "%") + "' class='progress_result ' style='width:" + (obj.value * 10 + "%") + "'></div>";
								html += "</div>";
								return html;
							}
						},
						{
							id: "history",
							header: "History",
							template: "{common.sparklines()}",
							width: 160
						}
					],
					data: fraud,
				},
				{
					view: "datatable",
					subrow:"Risk: #value#",
					columns: [
						{ id: "title", header: "Settlement Analytics", fillspace: true, css:"title_col",
						   template:"{common.subrow()} #title#"},
						{
							id: "value", header: "Likelihood", sort: "int", // fillspace: 2.5,
							template: function (obj) {
								var html = "<div class='progress_bar_element'>";
								html += "<div title='" + (parseInt(obj.value * 10, 10) + "%") + "' class='progress_result ' style='width:" + (obj.value * 10 + "%") + "'></div>";
								html += "</div>";
								return html;
							}
						},
					],
					data: fraud_settle,
				},

				// // chart
				// {
				// 	view: "chart",
				// 	type: "barH",
				// 	padding: { right: 150 },
				// 	// preset: "stick",
				// 	value: "#value#",
				// 	label: "#title#",
				// 	pieInnerText: "#title#",
				// 	shadow: 0,
				// 	data: fraud
				// },
			]
		};
	}
	init() {
	}
}
