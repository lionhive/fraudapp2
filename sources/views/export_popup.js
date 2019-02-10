import { JetView } from "webix-jet";
import { getPersons } from "models/persoptions";
import { getProjects } from "models/projoptions";

export default class ExportPopup extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const persons = getPersons();
		const projects = getProjects();

		return {
			view: "window",
			position: "center",
			modal: true,
			head: _("Export Fraud Explanations"),
			body: {
				// view: "form",
				view:"form",
				width: 600,
				localId: "form",
				elementsConfig: { labelWidth:150 },
				rows: [
					{
						view: "radio", label: "Format", value: 1, options: [
							{ id: 1, value: "PDF" }, // the initially selected item
							{ id: 2, value: "CSV" },
							{ id: 3, value: "Text" },
						],
					},
					{
						view: "radio", label: "Export Detail", value: 1, options: [
							{ id: 1, value: "Summary Only" }, // the initially selected item
							{ id: 2, value: "Full Text" },
						],
					},
					{
						view: "radio", label: "Fraud Explanations", value: 1, options: [
							{ id: 1, value: "All Explanations" },
							{ id: 2, value: "High Risk Only" },
							{ id: 3, value: "Selected Only" },
						],
					},
					{ view: "checkbox", id: "field_a", label: "Show Investigator Notes", value: 1 },
					{ view: "textarea", label: _("Additional Notes"), name: "task", width: 500 },
					{
						cols: [
							{
								view: "button", value: _("Cancel"),
								click: () => this.getBack()
							},
							{
								view: "button", value: _("Export"), type: "form",
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
	showWindow() {
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
