import {JetView} from "webix-jet";
import TasksView from "views/tasks";

export default class ProjectsView extends JetView {
	config(){
		return {
			cols:[
				{
					view:"sidebar",
					localId:"side:menu",
					width:200,
					on:{
						onAfterSelect:id => this.app.callEvent("tasks:filter",[id])
					},
					data:[
						{ id:"all", value:"All Claims", icon:"mdi mdi-file-tree" },
						{ id:"Active Investiation", value:"Active Investiation", icon:"mdi mdi-lifebuoy" },
						{ id:"Blocked", value:"Blocked", icon:"mdi mdi-monitor-cellphone-star" },
						{ id:"Investigation Closed", value:"Investigation Closed", icon:"mdi mdi-quality-high" },
						{ id:"New Claim", value:"New Claim", icon:"mdi mdi-database-check" }
					]
				},
				{ $subview:TasksView }
			]
		};
	}
}