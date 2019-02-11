import { JetView } from "webix-jet";

import ExportPopup from "views/export_popup";

export default class SideMenu extends JetView {
	config() {
		return {
			view: "sidemenu",
			id: "menu",
			width: 150,
			position: "left",
			state: function (state) {
				var toolbarHeight = $$("toolbar").$height;
				state.top = toolbarHeight;
				state.height -= toolbarHeight;
			},
			css: "my_menu",
			body: {
				view: "list",
				borderless: true,
				scroll: false,
				template: "<span class='webix_icon mdi mdi-#icon#'></span> #value#",
				on: {
					onAfterSelect: (id) => {
						console.log('clicked' + id);
						// this.exportpopup.showWindow();

						$$("dashsiu").show();
					}
				},
				data: [
					{
						id: 1, value: "Fraud Analyzer", icon: "cube",
					},
					{ id: 2, value: "Claims", icon: "database" },
					{ id: 3, value: "SIU Admin", icon: "account" },
					{ id: 4, value: "Metrics", icon: "chart-bar" },
					{ id: 5, value: "Settings", icon: "cogs" }
				],
				select: true,
				type: {
					height: 40
				}
			}
		};
	}
	init() {
		this.exportpopup = this.ui(ExportPopup);
	}
}

