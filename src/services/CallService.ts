import path from "path";
import fs from "fs";

import { readFile, writeFile } from "@utils/fs-promise";

import Data, { Call, DelegatePayload } from "@interfaces/Data";

class CallService {
  private jsonPath: string;

  public constructor() {
    this.jsonPath = path.join(__dirname, "..", "data", "data.json");

    fs.closeSync(fs.openSync(this.jsonPath, "a")); // Create file if doesn't exists

    const data = fs.readFileSync(this.jsonPath, "utf8");
    const obj: Data = JSON.parse(data || "{}");
    let shouldUpdate = false;

    if (!obj.calls) {
      obj.calls = [];
      shouldUpdate = true;
    }
    if (!obj.contacts) {
      obj.contacts = [];
      shouldUpdate = true;
    }

    if (!obj.delegate) {
      obj.delegate = [];
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      const json = JSON.stringify(obj);
      fs.writeFileSync(this.jsonPath, json, "utf8");
    }
  }
  public async newCall(call: Call): Promise<any> {
    const obj = await this.getData();

    const isNew =
      obj.calls.findIndex(
        (registeredCall: any): any => registeredCall.call_id === call.call_id,
      ) === -1;

    if (!isNew) {
      throw new Error(
        `The call with id ${call.call_id} has been already registered`,
      );
    }

    obj.calls.push(call);

    return this.setData(obj);
  }

  public async standBy(call: any): Promise<any> {
    const obj = await this.getData();

    // eslint-disable-next-line @typescript-eslint/camelcase
    const { their_number } = call;

    obj.calls = this.updateCall(obj.calls, call);

    let delegatedCall: DelegatePayload;

    if (!obj.contacts.includes(their_number)) {
      obj.contacts.push(their_number);
      delegatedCall = this.delegate(call);
    } else {
      delegatedCall = this.delegate(call, 901);
    }

    obj.delegate.push(delegatedCall);

    return this.setData(obj);
  }

  public async update(call: Call): Promise<any> {
    const obj = await this.getData();

    obj.calls = this.updateCall(obj.calls, call);

    return this.setData(obj);
  }

  public delegate(call: Call, destination: number = 900): DelegatePayload {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { type, call_id } = call;

    return {
      type,
      // eslint-disable-next-line @typescript-eslint/camelcase
      call_id,
      destination,
    };
  }

  private async getData(): Promise<Data> {
    const data = await readFile(this.jsonPath, "utf8");
    return JSON.parse(data.toString());
  }

  private async setData(data: Data): Promise<any> {
    const json = JSON.stringify(data);
    return writeFile(this.jsonPath, json, "utf8");
  }

  private updateCall(history: Call[], call: Call): any[] {
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
