import { Request, Response } from "express";

import CallService from "@services/CallService";

const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const test = await CallService.newCall(req.body);

    res.status(200).json(JSON.parse(test));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default webhookHandler;
