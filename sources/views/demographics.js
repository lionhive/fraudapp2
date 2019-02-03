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
						{ id: "title", header: "Location Fraud Demographics", fillspace: true, css:"title_col" },
						{ id: "value", header: "", fillspace: true, css:"danger" },
					],
					height: 100,
					data: demographic_loss,
				},
				{
					view: "chart",
					type: "barH",
					gradient:function(gradient){
						gradient.addColorStop(1.0,"#FF0000");
						gradient.addColorStop(0.2,"#FFFF00");
						gradient.addColorStop(0.0,"#00FF22");
					},
					xAxis:{
					},
					yAxis:{
						template:"",
					},
 					padding: { right: 40 },
					preset: "column",
					value: "#value#",
					label: "#title#",
					// pieInnerText: "#title#",
					data: demographics
				},
			]
		};
	}
}
