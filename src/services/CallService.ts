import path from "path";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const jsonPath = path.join(__dirname, "..", "data", "data.json");
class CallService {
  public async newCall(call: any): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    const obj = JSON.parse(data.toString());

    // eslint-disable-next-line @typescript-eslint/camelcase
    const { their_number } = call;

    if (!obj.contacts) {
      obj.contacts = [];
    }

    if (!obj.calls) {
      obj.calls = [];
    }

    if (!obj.contacts.includes(their_number)) {
      obj.contacts.push(their_number);
    }

    obj.calls.push(call);

    const json = JSON.stringify(obj);
    await writeFile(jsonPath, json, "utf8");
    return json;
  }
}

export default new CallService();
