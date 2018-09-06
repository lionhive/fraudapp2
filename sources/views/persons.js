import {JetView} from "webix-jet";
import {persons} from "models/persons";

export default class PersonsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		return {
			rows:[
				{
					view:"toolbar",
					localId:"toolbar",
					elements:[
						{ view:"label", label:_("Persons") },
						{},
						{
							view:"button", type:"icon", icon:"filter-variant",
							width:37, css:"toolbar_button",
							tooltip:_("Click to sort"),
							click:function(){
								let dir = "";
								if (this.config.icon.indexOf("up") !== -1){
									dir = "desc";
									this.config.icon = "arrow-down";
								}
								else {
									dir = "asc";
									this.config.icon = "arrow-up";
								}
								this.$scope.$$("list").sort("fname",dir);
								this.refresh();
							}
						}
					]
				},
				{
					view:"list",
					localId:"list",
					css:"persons_list",
					width:230,
					select:true,
					type:{
						template:(data,common) => {
							return common.userPic(data) +
								"<span class='username'>" + data.fname + " " + data.lname + "</span>" +
								common.money(data);
						},
						userPic:data => {
							if (data.photo)
								return "<image class='userphoto' src='data/photos/" + data.photo + ".jpg'>";
							else
								return "<span class='userpic'>" + data.fname.charAt(0) + "</span>";
						},
						money:data => "<span class='money'>$" + data.money + "</span>",
						height:70
					},
					on:{
						onAfterSelect:(id) => {
							const person = persons.getItem(id);
							this.app.callEvent("person:select",[person]);
						}
					}
				}
			]
		};
	}
	init(){
		const list = this.$$("list");
		persons.waitData.then(() => {
			list.sync(persons);
			list.select(list.getFirstId());
		});

		this.toggleTheme(this.app.config.theme);

		this.on(this.app,"task:select", id => {
			list.select(id);
			list.showItem(id);
		});
	}
	toggleTheme(theme){
		let toolbar = this.$$("toolbar").$view;
		if (theme === "dark")
			webix.html.addCss(toolbar,"webix_dark");
		else
			webix.html.removeCss(toolbar,"webix_dark");
	}
}
