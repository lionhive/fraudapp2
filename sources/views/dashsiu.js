import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import StatisticsView from "views/statistics";
import TimeView from "views/time";

import ClaimantView from "views/claimant";
import EstimatesView from "views/estimates";
import FraudView from "views/fraud";
import InsuredView from "views/insured";
import LossView from "views/loss";

import ProgressView from "views/progress";
import ProjectsView from "views/projects";
import RulesView from "views/rules";
import CompareView from "views/compare";

export default class DashboardView extends JetView{
	config(){
		return {
			type:"space", paddingX:0,
			cols:[
				PersonsView,
				{
					view:"scrollview",
					borderless:true,
					body:{
						type:"wide",
						rows:[
							{
								id:"time-and-progress-layout",
								type:"wide",
								rows:[
									{
										type:"wide",
										// This causes early wrapping
										// responsive:"time-and-progress-layout",
										cols:[
											TimeView, CompareView// ProgressView
										]
									}
								]
							},
							{
								id:"time-and-progress-layout",
								type:"wide",
								rows:[
									{
										type:"wide",
										responsive:"time-and-progress-layout",
										cols:[
											ProgressView
										]
									}
								]
							},
							{
								height:300,
								type:"wide",
								cols:[
									ProjectsView,
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
