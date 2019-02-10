import { JetView } from "webix-jet";
import { report, report_schema } from "../models/claimant";

const police_report =
  "Officer: John Brown #547<br/>" +
  "Presinct: Galloway Township Police Department<br/>" +
	"Date of incident: 2018-12-22 13:20<br/>" +
	"<br/>" +
  "At 1315 hours on 4 January 2019, Officer John Brown #547, was dispatched to a workplace accident at 301 Crown Place, Smithville. " +
	"Brown arrived at construction zone at 1320 hours. A construction worker was <div class='red_text red_text_light'>standing on the front lawn</div> bleeding from the head. " +
	"The construction worker identified himself as Jim and appeared calm and explained there were <div class='red_text'>no witnesses</div> who saw the accident. " +
	"Jim explained that a 48\" aluminum level fell from a scaffolding and hit him in the head, cutting him badly." +
	"The incident happened approximately 1200 hours, <div class='red_text red_text_light'>1 hour before 911</div> was called." +
	"";

export default class ExplanationPopup extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			view: "window",
			position: "center",
			modal: true,
			select: "cell",
			head: _("Fraud Explanations"),
			// width: "60%",
			// height: "1800px",
			body: {
				view: "form",
				localId: "form",
				height: 400,
				width: 800,
				elementsConfig: { labelPosition: "top" },
				cols: [
					{
						container: "layout_div", // corresponds to the ID of the div block
						rows: [
							{
								view:"property",
								id:"report",
								// nameWidth: 50,
								elements:report_schema,
								data: report,
								height: 80,
							},
							{
								view: "richtext",
								width:500,
								// css property does not seem to work here.
								css: "explanations",
								label: "Fraud Explanations",
								labelAlign: "left",
								height: 250,
								value: police_report,
								readonly: true,
							},
						],
					},
					{view:"resizer"},
					{
						container: "layout_div", // corresponds to the ID of the div block
						rows: [
							{ template: _("Investigator Comments"), type: "header", css: "webix_header chart_header" },
							// { view: "spacer", height: 10 },
							{
								view: "comments",
								currentUser: 3,
								// paddingX:0,
								mode: "chat",
								data: [
									// {
									// 	id: 0, user_id: 2, date: "2018-01-12 15:33",
									// 	text: "Requested job site employee list for date of loss."
									// },
									{
										id: 1, user_id: 1, date: "2018-01-28 18:45",
										text: "Spoke with job foreman who said the claimant had been taking many sick days."
									},
									{
										id: 2, user_id: 2, date: "2019-02-01 19:40",
										text: "I filed a request to get security camera footage, waiting for response."
									}
								],
								users: [
									{ id: 1, value: "Corvo Attano", image: "./data/photos/abdul.jpg", status: "away" },
									{ id: 2, value: "Alison Fitzroy", image: "./data/photos/alison.jpg", status: "active" },
									{ id: 3, value: "Tomas Vykruta", image: "./data/photos/tom.png", status: "active" },
								]
							},
							{
								cols: [
									{
										view: "button", value: _("Cancel"),
										click: () => this.getBack()
									},
									{
										view: "button", value: _("Save"), type: "form",
										click: () => this.saveTask()
									}
								]
							}
						]
					},
				],
			rules: {
				user: webix.rules.isNotEmpty,
				task: webix.rules.isNotEmpty
			}
		}
	};
}
showWindow(item) {
	// item.task contains the taks description.
	this.explanation = item;
	this.getRoot().show();
}
getBack() {
	this.getRoot().hide();
	this.$$("form").clear();
	this.$$("form").clearValidation();
}
saveTask() {
	const task = this.$$("form").getValues();
	if (this.$$("form").validate()) {
		this.app.callEvent("add:task", [task]);
		this.getBack();
	}
}
}
