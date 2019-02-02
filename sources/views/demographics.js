import { JetView } from "webix-jet";
import { demographics, demographic_loss} from "../models/claimant";

export default class DemographicsView extends JetView {
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
						{ id: "title", header: "Location and Nearby Demographics", fillspace: true, css:"title_col" },
						{ id: "value", header: "", fillspace: true, css:"danger" },
					],
					height: 100,
					data: demographic_loss,
				},
				{
					view: "chart",
					type: "pie",
					// padding: { right: 150 },
					// preset: "stick",
					value: "#value#",
					label: "#title#",
					// pieInnerText: "#title#",
					shadow: 0,
					data: demographics
				},
			]
		};
	}
}
