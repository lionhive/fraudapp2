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

function generateTimeSeries(points, min, max) {
	var data = [];
	var date = new Date(2018, 0, 1);

	for (var i = 0; i <= points; i++) {
		// var stringDate = date.getMonth() + "/" + date.getFullYear();
		data.push(
			{
				time: i, //date,
				sales: Math.round(random() * (max - min) + min)
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

const claim_volume = generateTimeSeries(points, 25000, 35000);

var data = [];
for (var i = 0; i <= 200; i++)
	data.push({ time: i + 1, sales: Math.round(Math.random() * 5000 + 2000) });

var chart = {
	view: "chart", id: "dchart",
	type: "line",
	value: "#sales#",
	// xAxis: { template: "#time#" },

	xAxis: {
		lineColor: function (obj) {
			let date = new Date(2018, 1, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 1) ? "#404040" : "#e0e0e0";
		},
		template: function (obj) {
			let date = new Date(2018, 1, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 15) ?
				date.toLocaleString('en-us', { month: 'long' }) + ", " + date.getFullYear()
					: "";
		},
	},
	item: {
		borderColor: "#1293f8",
		color: "#ffffff"
	},
};

var range = {
	view: "rangechart", height: 80, id: "range",
	type: "line",
	value: "#sales#", padding: 0,
	frameId: "time",
	item: { radius: 0 },
	data: claim_volume,
	on: {
		onAfterRangeChange: function () {
			$$("dchart").clearAll();
			$$("dchart").parse(this.getFrameData());
		}
	},
	range: { start: 30, end: 130 },
	xAxis: {
		lineColor: function (obj) {
			let date = new Date(2018, 1, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 1) ? "#404040" : "#e0e0e0";
		},
		template: function (obj) {
			let date = new Date(2018, 1, 1);
			date.setDate(date.getDate() + obj.time);
			return (date.getDate() == 15) ?
				date.toLocaleString('en-us', { month: 'long' }) + ", " + date.getFullYear()
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
};

function getScale() {
	var scale = $$("range").getFrameRange();
	var str = "start: " + scale.start + ", end: " + scale.end;
	$$("result").setValue(str);
};

export default class MetricsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "wide", gravity: 2,
			minWidth: 500,
			height: 300,
			rows: [
				{ template: _("Claim Fraud Analytics"), type: "header", css: "webix_header chart_header" },
				chart,
				range,
			]
		};
	}
	init() {
	}
}
