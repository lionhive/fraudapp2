import { JetView } from "webix-jet";
import { claimant, claimant_schema, insured, insured_schema, claim, claim_schema } from "../models/claimant";

export default class ClaimantView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "clean",
			rows: [
				{
					view:"property",
					id:"claim",
					elements:claim_schema,
					data: claim,
					height:120,
				},
				{
					view:"property",
					id:"claimant",
					elements:claimant_schema,
					data: claimant,
					height:75,
			  },
				{
					view:"property",
					id:"insured",
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
