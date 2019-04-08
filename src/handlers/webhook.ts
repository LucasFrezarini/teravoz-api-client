import { Request, Response } from "express";

import CallService from "@services/CallService";

const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const call = req.body;
    const { type } = call;

    switch (type) {
      case "call.new":
        await CallService.newCall(call);
        break;
      case "call.standby":
        await CallService.standBy(call);
        break;
      default:
        await CallService.update(call);
        break;
    }

    res.status(200).json({ status: "ok " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default webhookHandler;
