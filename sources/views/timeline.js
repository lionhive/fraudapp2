import {JetView} from "webix-jet";

export default class ProgressView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			view:"bullet",
			id:"b3",
			value:76,
			label:"Claim Events",
			marker: 85,
			placeholder:"average",
			stroke:16,
			color:"#ffffff",
			bands:[
				{ value:120, color:"#47c6b9"},
				{ value:80, color:"#fec02f"},
				{ value:60, color:"#f0443d"},
			]
		};
	}
	init(){
		let chart = this.$$("progress");
		this.on(this.app,"person:select",person => {
			chart.parse(webix.copy(person.progress));
			const name = person.fname + " " + person.lname;
			this.newLegend(name);
		});
	}
	newLegend(name){
		let chart = this.$$("progress");
		chart.define("legend", {
			values:[
				{ text:name, color:"#1CA1C1" }
			],
			align:"right", layout:"x", valign:"bottom", margin:4, padding:10,
			marker:{
				type:"round", width:7, height:8
			}
		});
		chart.refresh();
	}
}
