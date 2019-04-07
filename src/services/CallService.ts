import path from "path";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const jsonPath = path.join(__dirname, "..", "data", "calls.json");
class CallService {
  public async newCall(call: any): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    const obj = JSON.parse(data.toString());

    if (!obj.data) {
      obj.data = [];
    }

    obj.data.push(call);

    const json = JSON.stringify(obj);
    await writeFile(jsonPath, json, "utf8");
    return json;
  }
}

export default new CallService();
