import { JetView } from "webix-jet";
/*
	Global insight metrics time series for claim fraud.

	1. Claim volume
	2. Fraud claim detected
	3. Fraud claim actively investigated

	Break down by type
	1. Group 1 (Workers Comp)
	2. Group 2 (Auto)

	Business unit profitability
	1. Investigation Cost
	2. Recovered
	3. Settlement

	more sophisticated charts:
	https://docs.webix.com/desktop__chart_integration.html
*/

function daysBetweenDates(firstDate, secondDate) {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
}

function generateTimeSeries(points, min, max) {
	var data = [];
	var date = new Date(2018, 5, 1);

	points = daysBetweenDates(date, new Date());
	let previous_fraud = 0;
	for (var i = 0; i <= points; i++) {

		let seasonal = 1 + Math.cos(i*3.14/90 + Math.sin(i/50)) / 4;
		const claims = seasonal * Math.round(random() * (max - min) + min);
		const fraud = Math.round((claims * 0.2 * random() * 2.0 + 1.5));

		if (previous_fraud == 0) {
			previous_fraud = fraud;
		}

		previous_fraud += Math.max((fraud - previous_fraud) * 0.7, 0);
		previous_fraud *= 0.8;
		let investigations = Math.round(previous_fraud);

		data.push(
			{
				time: i,
				claims: claims,
				fraud: fraud,
				investigations: investigations,
			});
		date.setMonth(date.getMonth() + 1);
	}
	return data;
}

var seed = 1;
function random() {
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

const points = 200;
// Generate claim volume
seed = 100;

// Create time series of claims volume.
const claim_volume = generateTimeSeries(points, 120000 / 365, 150000 / 365);

// Series for main chart.
const series = [
	{
		value: "#claims#",
		tooltip: { template: "New claims: #claims#" },
	},
	{
		value: "#fraud#",
		tooltip: { template: "Detected fraud: #fraud#" },
		color: "#ff0000",
		alpha: 0.5,
	},
	{
		value: "#investigations#",
		tooltip: { template: "Investigation Response: #investigations#" },
		color: "#80ff80",
		alpha: 0.8,
	},
];

// Main chart
var chart = {
	view: "chart", id: "dchart",
	type: "splineArea",
	// value: "#claims#",
	height: 350,
	color: "#0000ff",
	// padding: 10,
	borderWidth: 2,
	alpha: 0.2,
	line: {
		width: 40
	},
	yAxis: {
		// start: 0,
		// step: 5000,
		// end: 30000
	},
	xAxis: {
		lineColor: function (obj) {
			let date = new Date(2018, 5, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 1) ? "#404040" : "#e0e0e0";
		},
		template: function (obj) {
			let date = new Date(2018, 5, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 15) ?
				date.toLocaleString("en-us", { month: "long" }) + ", " + date.getFullYear()
				: "";
		},
	},
	item: { radius: 0 },

	legend: {
		values: [
			{ text: "New Claims", color: "#0000ff40" },
			{ text: "Fraud Detected", color: "#ff0000" },
			{ text: "Investigation Response", color: "#80ff80" }],
		align: "right",
		valign: "middle",
		layout: "y",
		width: 150,
		margin: 8
	},
	series: series,
};

const totalDays = daysBetweenDates(new Date(), new Date(2018, 5, 1));

var range = {
	view: "rangechart", height: 80, id: "range",
	type: "line",
	// value: "#claims#",
	series: [
		{
			value: "#claims#",
		},
		{
			value: "#fraud#",
			line: {
				color: "#ff000040",
			}
		},
	],
	padding: 0,
	frameId: "time",
	item: { radius: 0 },
	data: claim_volume,
	on: {
		onAfterRangeChange: function () {
			$$("dchart").clearAll();
			$$("dchart").parse(this.getFrameData());
		}
	},
	range: { start: totalDays - 50, end: totalDays },
	xAxis: {
		lineColor: function (obj) {
			let date = new Date(2018, 5, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 1) ? "#404040" : "#e0e0e0";
		},
		template: function (obj) {
			let date = new Date(2018, 5, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 15) ?
				date.toLocaleString("en-us", { month: "long" }) + ", " + date.getFullYear()
				: "";
		},
	},
};

var buttons = {
	cols: [
		{ view: "button", width: 100, value: "Get data", click: getData },
		{ view: "button", width: 100, value: "Get X scale", click: getScale }
	]
};


function getData(index, prop) {
	var data = $$("range").getFrameData(index);
	var arr = [];
	for (var i = 0; i < data.length; i++)  arr.push(data[i].sales);
	$$("result").setValue(arr.join(", "));
}

function getScale() {
	var scale = $$("range").getFrameRange();
	var str = "start: " + scale.start + ", end: " + scale.end;
	$$("result").setValue(str);
}


// Drag and drop to enable/disable metrics
// const metrics_select = {
// 	view:"dbllist",
// 	list:{ autoheight: true },
// 	labelLeft:"Available Series",
// 	labelRight:"Selected",
// 	data:[
// 			{id:"1", value:"Claim Volume"},
// 			{id:"2", value:"Fraud Detected"},
// 			{id:"3", value:"Active Claims"},
// 			{id:"4", value:"Cloased Claims"},
// 	]
// };

var form1 = [
	{ view: "label", label: "Configuration" },
	{
		view: "checkbox", id: "check_claim_volume", label: "Claim Volume", value: 1,
		on: {
			onChange: function () {
				console.log(this.getValue());
			}
		}
	},
	{ view: "checkbox", label: "Fraud Detected", value: 1, id: "check_fraud" },
	{ view: "checkbox", label: "Active Investigations", value: 1, id: "check_active" },
];

const metrics_select = {
	view: "form",
	scroll: false,
	width: 300,
	elements: form1,
	elementsConfig:
		{ labelWidth: 100 }
};

export default class MetricsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "wide", gravity: 2,
			cols: [
				{
					view: "form",
					width: 250,
					cols: [
						metrics_select,
					],
				},
				{
					rows: [
						{ template: _("Claim Fraud Analytics"), type: "header", css: "webix_header chart_header" },
						chart,
						range,
					],
				},
			],
		};
	}
	init() {
	}
}
