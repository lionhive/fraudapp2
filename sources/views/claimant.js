import { JetView } from "webix-jet";
import { claimant, insured, insured_schema, claimant_schema } from "../models/claimant";

export default class ClaimantView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "clean",
			rows: [
				{
					view:"property",
					id:"claimant",
					elements:claimant_schema,
					data: claimant,
			  },
				{
					view:"property",
					id:"claimant",
					elements:insured_schema,
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
