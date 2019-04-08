import { readFile } from "@utils/fs-promise";
import path from "path";

const jsonPath = path.join(__dirname, "..", "..", "data", "data.json");

const Query = {
  async calls(): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    const obj = JSON.parse(data);

    return obj.calls;
  },

  async contacts(): Promise<any> {
    const data = await readFile(jsonPath, "utf8");
    const obj = JSON.parse(data);

    return obj.contacts;
  },
};

export default Query;
