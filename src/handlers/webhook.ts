import { Request, Response } from "express";

import CallService from "@services/CallService";

const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  const test = await CallService.newCall({
    type: "call.new",
    call_id: "1463669263.30033",
    code: "123456",
    direction: "inbound",
    our_number: "0800000000",
    their_number: "11999990000",
    their_number_type: "mobile",
    timestamp: "2017-01-01T00:00:00Z",
  });

  res.status(200).json(JSON.parse(test));
};

export default webhookHandler;
