import { readFile } from "@utils/fs-promise";
import path from "path";
import { Call } from "@interfaces/Data";

const jsonPath = path.join(__dirname, "..", "..", "data", "data.json");

const Query = {
  async calls(): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    const obj = JSON.parse(data);

    return obj.calls
      .filter((call: Call): boolean => call.type !== "call.finished")
      .reverse();
  },

  async contacts(): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    const obj = JSON.parse(data);

    return obj.contacts;
  },

  async delegates(): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    const obj = JSON.parse(data);

    return obj.delegate;
  },
};

export default Query;
