import { JetView } from "webix-jet";
import { getPersons } from "models/persoptions";
import { getProjects } from "models/projoptions";

export const explanations = [
	{ title: "Police Report 1/5/2019" },
	{ title: "Average prescription oost analysis" },
	{
		title: "At 0815 hours on 4 January 2010, I, Officer John Brown #547, was dispatched to a workplace accident at 301 Crown Place, Smithville."
			+ "  I arrived at construction zone at 1320 hours. A construciont worker was standing on the front lawn."
			+ ""
	}
];
const police_report = "At 1315 hours on 4 January 2019, I, Officer John Brown #547, was dispatched to a workplace accident at 301 Crown Place, Smithville. " +
	"Brown arrived at construction zone at 1320 hours. A construction worker was <div class='red_text red_text_light'>standing on the front lawn</div> bleeding from the head. " +
	"The construction worker identified himself as Jim and appeared calm and explained there were <div class='red_text'>no witnesses</div> who saw the accident. " +
	"Jim explained that a 48\" aluminum level fell from a scaffolding and hit him in the head, cutting him badly." +
	"The incident happened approximately 1200 hours, <div class='red_text red_text_light'>1 hour before 911</div> was called." +
	"";

export default class ExplanationPopup extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const persons = getPersons();
		const projects = getProjects();

		return {
			view: "window",
			position: "center",
			modal: true,
			select: "cell",
			head: _("Police Report 04/2019"),
			// width: "60%",
			// height: "1800px",
			body: {
				view: "form",
				localId: "form",
				elementsConfig: { labelPosition: "top" },
				rows: [
					// eslint-disable-next-line quotes
					// { id:'header', view:"text", label:this.explanation.task, name:"task", width:500 },
					{
						view: "datatable",
						header: false,
						width: 600,
						columns: [
							{
								id: "title", width: 600, sort: "int",
							},
						],
						data: explanations,
					},
					{
						view: "richtext",
						label: "Police Report",
						labelAlign: "left",
						height: 150,
						value: police_report,
						readonly: true,
					},
					{
						cols: [
							{
								view: "button", value: _("Cancel"),
								click: () => this.getBack()
							},
							{
								view: "button", value: _("Add"), type: "form",
								click: () => this.saveTask()
							}
						]
					}
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
