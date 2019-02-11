import { JetView } from "webix-jet";
import ToolbarView from "views/toolbar";

export default class TopView extends JetView {
	config() {
		return {
			rows: [
				ToolbarView,
				{ $subview: true },
			],
		};
	}
}

// Uncomment this to enable ap ermament left toolbar.
// Looks nice but conflicts with the Claims view.

// export default class TopView extends JetView {
// 	config() {
// 		return {
// 			cols: [
// 				{
// 					cols: [
// 						// { template: "" },
// 						{
// 							rows: [
// 								{
// 									css: "menu",
// 									padding: 2,
// 									view: "form",
// 									cols: [
// 										{
// 											view: "button", type: "icon", icon: "mdi mdi-menu", inputWidth: 37, align: "right", css: "app_button menu",
// 											click: function () {
// 												$$("$sidebar1").toggle()
// 											}
// 										}
// 									]
// 								},
// 								{
// 									view: "sidebar",
// 									collapsed: true,
// 									position: "left",
// 									data: menu_data
// 								}
// 							]
// 						}
// 					]
// 				},
// 				{
// 					rows: [
// 						ToolbarView,
// 						{ $subview: true },
// 					],
// 				}
// 			],
// 		};
// 	}
// }


// var menu_data = [
// 	{
// 		id: "dashboard", icon: "mdi mdi-view-dashboard", value: "Dashboards", data: [
// 			{ id: "dashboard1", value: "Dashboard 1" },
// 			{ id: "dashboard2", value: "Dashboard 2" }
// 		]
// 	},
// 	{
// 		id: "layouts", icon: "mdi mdi-view-column", value: "Layouts", data: [
// 			{ id: "accordions", value: "Accordions" },
// 			{ id: "portlets", value: "Portlets" }
// 		]
// 	},
// 	{
// 		id: "tables", icon: "mdi mdi-table", value: "Data Tables", data: [
// 			{ id: "tables1", value: "Datatable" },
// 			{ id: "tables2", value: "TreeTable" },
// 			{ id: "tables3", value: "Pivot" }
// 		]
// 	},
// 	{
// 		id: "uis", icon: "mdi mdi-puzzle", value: "UI Components", data: [
// 			{ id: "dataview", value: "DataView" },
// 			{ id: "list", value: "List" },
// 			{ id: "menu", value: "Menu" },
// 			{ id: "tree", value: "Tree" }
// 		]
// 	},
// 	{
// 		id: "tools", icon: "mdi mdi-calendar", value: "Tools", data: [
// 			{ id: "kanban", value: "Kanban Board" },
// 			{ id: "pivot", value: "Pivot Chart" },
// 			{ id: "scheduler", value: "Calendar" }
// 		]
// 	},
// 	{
// 		id: "forms", icon: "mdi mdi-pencil", value: "Forms", data: [
// 			{ id: "buttons", value: "Buttons" },
// 			{ id: "selects", value: "Select boxes" },
// 			{ id: "inputs", value: "Inputs" }
// 		]
// 	},
// 	{ id: "demo", icon: "mdi mdi-book", value: "Documentation" }
// ];
