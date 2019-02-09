export function getNotifications(){
	return notifications;
}

const notifications = [
	{ title:"New claims with detected fraud", message:"8 new claims available with 80% or higher fraud predicted." },
	{ title:"Updated claims with detected fraud", message:"18 claims with fraud predicted that had previously no fraud detected." },
];
