import {JetView} from "webix-jet";
import {rules} from "models/rules";
import {getLangsList} from "models/langslist";

import ExplanationPopup from "views/explanation_popup";

export default class RulesView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const date_format = webix.Date.dateToStr("%d %M %y");
		// replace a colunn's header: value with this to add a button.
		//const zoom_button = "<button id='settings' class='webix_button webixtype_base' style=''>?</button>";
		parent = this;
		return {
			view:"datatable",
			gravity:3,
			select:"multiselect",
			editable:true,
			editaction:"dblclick",
			tooltip:true,
			columns:[
				{
					id:"status", width:40, header:"", sort:"int",
					tooltip:_("Click to complete/uncomplete the task"),
					template: obj => {
						if (obj.status)
							return "<span class='webix_icon mdi mdi-check-circle complete'></span>";
						else
							return "<span class='webix_icon mdi mdi-clock incomplete'></span>";
					}
				},
				{
					id:"task", fillspace:3, header:_("Explanation"),
					sort:"text", editor:"text",
					tooltip:_("Double-click to edit the explanation"),
					template: obj => _(obj.task)
				},
				// {
				// 	id:"weight", fillspace:3, header:_("Risk"),
				// 	sort:"text", editor:"text",
				// 	tooltip:_("Double-click to edit the task name"),
				// 	template: obj => _(obj.weight)
				// },
				{
					id: "weight", header: "Impact", sort: "int", // fillspace: 2.5,
					template: function (obj) {
						var html = "<div class='progress_bar_element'>";
						html += "<div title='" + (parseInt(obj.weight * 100, 10) + "%") + "' class='progress_result ' style='width:" + (obj.weight * 100 + "%") + "'></div>";
						html += "</div>";
						return html;
					}
				},
				{
					id:"start", fillspace:1,
					format:date_format,
					sort:"date", tooltip:_("The task was created"),
					header:_("Start")
				},
				{
					id:"end", fillspace:1, header:_("Completed"),
					sort:"date",
					tooltip:obj => {
						return obj.end ? _("The task was completed") : _("Click on the red clock to complete the task");
					},
					template: obj => {
						if (!obj.end)
							return _("incomplete");
						else return date_format(obj.end);
					}
				}
			],
			on:{
				onAfterSelect:function(row){
					const user = this.getItem(row.id).user;
					this.$scope.app.callEvent("task:select",[user]);
					this.showItem(row.id);

					// Pop up window with details of rule.
				  parent.newtask.showWindow(this.getItem(row.id));
				}
			},
			onClick:{
				"mdi":function(ev,id){
					const new_status = !this.getItem(id.row).status;
					const end_date = new_status ? new Date() : null;
					this.updateItem(id.row,{ status:new_status,end:end_date });
					return false;
				}
			}
		};
	}
	init(view,url){
		view.sync(rules);
	  parent.newtask = parent.ui(ExplanationPopup);

		const lang = this.app.getService("locale").getLang();
		if (lang !== "en"){
			const langs = getLangsList();
			const country = langs.find(l => l.id === lang).code;
			webix.i18n.setLocale(lang+"-"+country);
		}

		this.on(this.app,"person:select",person => {
			let res = rules.find((obj) => person.id == obj.user);
			view.unselect();
			if (res.length){
				for (let i = 0; i < res.length; i++){
					view.select(res[i].id,true);
				}
			}
		});


		this.on(this.app,"tasks:filter",id => {
			if (id === "all")
				view.filter();
			else
				view.filter("#project#",id);

			if (!view.count())
				view.showOverlay("Looks like this project needs some love and attention");
			else
				view.hideOverlay();
		});
	}
	urlChange(){
		const param = this.getParam("lookup");
		if (param)
			this.getRoot().filter(obj => {
				if (obj.task.toLowerCase().indexOf(param) !== -1) return true;
			});
	}
}
