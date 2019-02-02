import {JetView} from "webix-jet";
import PersonsView from "views/persons";
import StatisticsView from "views/statistics";
import TimeView from "views/time";

import ClaimantView from "views/claimant";
import DemographicsView from "views/demographics"
import EstimatesView from "views/estimates";
import FraudView from "views/fraud";
import InsuredView from "views/insured";
import LossView from "views/loss";

import ProgressView from "views/progress";
import RulesView from "views/rules";
import CompareView from "views/compare";

export default class DashboardView extends JetView{
	config(){
		return {
			type:"space", paddingX:0,
			cols:[
				// PersonsView,
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
											ClaimantView, FraudView, DemographicsView// ProgressView
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
											LossView, RulesView //, ProgressView
										]
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
