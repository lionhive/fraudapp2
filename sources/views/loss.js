import { JetView } from "webix-jet";
import { loss, loss_schema	 } from "../models/claimant";

export default class LossView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "clean",
			rows: [
				// { template:_("Fraud"), type:"header", css:"webix_header chart_header" },
				{
					view:"property",
					id:"loss",
					elements:loss_schema,
					data: loss,
			  },
				{
					view: "textarea",
					// label: "Notes",
					value: "Type notes here."
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
