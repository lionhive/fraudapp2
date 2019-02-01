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
						{ id:"Support", value:"SIU Claims", icon:"mdi mdi-lifebuoy" },
						{ id:"Failure Testing", value:"Unprocessed Claims", icon:"mdi mdi-monitor-cellphone-star" },
						{ id:"Quality Management", value:"Litigation", icon:"mdi mdi-quality-high" },
						{ id:"Data Quality", value:"High Alert", icon:"mdi mdi-database-check" }
					]
				},
				{ $subview:TasksView }
			]
		};
	}
}