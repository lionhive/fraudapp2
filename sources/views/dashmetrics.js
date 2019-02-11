import {JetView} from "webix-jet";
import MetricsView from "views/metrics";


export default class DashboardView extends JetView{
	config(){
		return {
			type:"space", paddingX:0,
			cols:[
				{
					view:"scrollview",
					borderless:true,
					body:{
						type:"wide",
						rows:[
							{
								view:"toolbar",
								id:"myToolbar",
								cols:[
								{
										view:"daterangepicker",
										name:"daterange",
										width:500,
										label:"Date Range",
										value:{start: new Date(), end: webix.Date.add(new Date(), 1, "month")}
								},
										// { view:"button", id:"LoadBut", value:"Load", width:100, align:"left" },
										// { view:"button", value:"Save", width:100, align:"center" },
										// { view:"button", value:"Info", width:100, align:"right" },
									]
							},
							{
								// type:"wide",
								rows:[
									{
										type:"wide",
										// This causes early wrapping
										// responsive:"time-and-progress-layout",
										cols:[
											MetricsView,
										],
									}
								]
							},
						]
					}
				},
				{ width:1 }
			]
		};
	}
}
