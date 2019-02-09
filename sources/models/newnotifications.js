let i = 0;
export function newNotification(){
	return webix.copy(notifications[i++%notifications.length]);
}
const notifications = [
	{ title:"Lorena Rush flagged critical claims", message:"5 new total disability claims" },
	{ title:"New fraud network detected", message:"17 individuals in collusion network" },
];
