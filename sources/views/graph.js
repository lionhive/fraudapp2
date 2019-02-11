import { JetView } from "webix-jet";
/*

	Graph

*/
const names = [
	"Mary Smith",
	"Patricia Johnson",
	"Linda Williams",
	"Barbara Jones",
	"Elizabeth Brown",
	"Jennifer Davis",
	"Maria Miller",
	"Susan Wilson",
	"Margaret Moore",
	"Dorothy Taylor",
	"Lisa Anderson",
	"Nancy Thomas",
	"Karen Jackson",
	"Betty White",
	"Helen Harris",
	"Sandra Martin",
	"Donna Thompson",
	"Carol Garcia",
	"Ruth Martinez",
	"Sharon Robinson",
	"Michelle Clark",
	"Laura Rodriguez",
	"Sarah Lewis",
	"Kimberly Lee",
	"Deborah Walker",
	"Jessica Hall",
	"Shirley Allen",
	"Cynthia Young",
	"Angela Hernandez",
	"Melissa King",
	"Frank Wright",
	"Scott Lopez",
	"Eric Hill",
	"Stephen Scott",
	"Andrew Green",
	"Raymond Adams",
	"Gregory Baker",
	"Joshua Gonzalez",
	"Jerry Nelson",
	"Dennis Carter",
	"Walter Mitchell",
	"Patrick Perez",
	"Peter Roberts",
	"Harold Turner",
	"Douglas Phillips",
	"Henry Campbell",
	"Carl Parker",
	"Arthur Evans",
	"Ryan Edwards",
	"Roger Collins",
	"Joe Stewart",
	"Juan Sanchez",
	"Jack Morris",
	"Albert Rogers",
	"Jonathan Reed",
	"Justin Cook",
	"Terry Morgan",
	"Gerald Bell",
	"Keith Murphy",
	"Samuel Bailey",
	"Willie Rivera",
	"Ralph Cooper",
	"Lawrence Richardson",
	"Nicholas Cox",
	"Roy Howard",
	"Benjamin Ward",
	"Bruce Torres",
	"Brandon Peterson",
	"Adam Gray",
	"Harry Ramirez",
	"Fred James",
	"Wayne Watson",
	"Billy Brooks",
];

const roles = [
	{ role: "Attorney", color: "#FF7F50", },
	{ role: "Attorney", color: "#FF7F50", },
	{ role: "Claimant", color: "#6495ED", },
	{ role: "Claimant", color: "#6495ED", },
	{ role: "Claimant", color: "#6495ED", },
	{ role: "Claimant", color: "#6495ED", },
	{ role: "Provider", color: "#9932CC", },
	{ role: "Provider", color: "#9932CC", },
	{ role: "Employer", color: "#ff0000", },
];


function randomString(stringList) {
	var randomNumber = Math.floor(Math.random()*stringList.length);
	return stringList[randomNumber];
}
var i,
	s,
	N = 60,
	E = 100,
	g = {
		nodes: [],
		edges: []
	};
for (i = 0; i < N; i++) {
	const role = randomString(roles);
	g.nodes.push({
		id: "n" + i,
		label: role.role + ": " + randomString(names),
		x: (Math.random()),
		y: (Math.random()),
		size: Math.random(),
		color: role.color,
	});
}

for (i = 0; i < E; i++)
	g.edges.push({
		id: "e" + i,
		source: "n" + (Math.random() * N | 0),
		target: "n" + (Math.random() * N | 0),
		size: Math.random(),
		color: "#ccc"
	});

export default class GraphView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			type: "wide", gravity: 2,
			cols: [
				{
					view: "form",
					width: 250,
					cols: [

					],
				},
				{
					rows: [
						{ template: _("Graph Analytics"), type: "header", css: "webix_header chart_header" },
						{
							view: "sigma-chart",
							background: "#0",
							config: {
								graph: g
							},
						}
					],
				},
			],
		};
	}
	init() {
	}
}
