import { JetView } from "webix-jet";
import { getPersons } from "models/persoptions";
import { getProjects } from "models/projoptions";

export const explanations = [
	{ title: "Letter from attorney 1/5/2019" },
	{ title: "Average prescription oost analysis" },
];

export default class ExplanationPopup extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const persons = getPersons();
		const projects = getProjects();

		return {
			view: "window",
			position: "center",
			modal: true,
			select:"cell",
			head: _("Explanation Evidence"),
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
