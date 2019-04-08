import path from "path";
import fs from "fs";

import { readFile, writeFile } from "@utils/fs-promise";

const jsonPath = path.join(__dirname, "..", "data", "data.json");

class CallService {
  public constructor() {
    const data = fs.readFileSync(jsonPath, "utf8");
    const obj = JSON.parse(data);
    let shouldUpdate = false;

    if (!obj.calls) {
      obj.calls = [];
      shouldUpdate = true;
    }
    if (!obj.contacts) {
      obj.contacts = [];
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      const json = JSON.stringify(obj);
      fs.writeFileSync(jsonPath, json, "utf8");
    }
  }
  public async newCall(call: any): Promise<any> {
    const obj = await this.getData();

    obj.calls.push(call);

    return this.setData(obj);
  }

  public async standBy(call: any): Promise<any> {
    const obj = await this.getData();

    // eslint-disable-next-line @typescript-eslint/camelcase
    const { their_number } = call;

    obj.calls = this.updateCall(obj.calls, call);

    if (!obj.contacts.includes(their_number)) {
      obj.contacts.push(their_number);
      // Post to /actions with extension 900
    } else {
      // post to /actions with extension 901
    }

    return this.setData(obj);
  }

  public async update(call: any): Promise<any> {
    const obj = await this.getData();

    obj.calls = this.updateCall(obj.calls, call);

    return this.setData(obj);
  }

  private async getData(): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    return JSON.parse(data.toString());
  }

  private async setData(data: any): Promise<any> {
    const json = JSON.stringify(data);
    return writeFile(jsonPath, json, "utf8");
  }

  private updateCall(history: any[], call: any): any[] {
    const index = history.findIndex(
      (registeredCall: any): any => registeredCall.call_id === call.call_id,
    );

    if (index === -1) {
      throw new Error(`Call with id ${call.call_id} not found.`);
    }

    history[index] = call;
    return history;
  }
}

export default new CallService();
