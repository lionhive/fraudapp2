import { JetView } from "webix-jet";
import { demographics, demographic_loss} from "../models/claimant";

export default class FileView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
      vieW: "tabview",
    }
  }
}