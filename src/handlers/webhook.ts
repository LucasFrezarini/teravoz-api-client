import { Request, Response } from "express";

import CallService from "@services/CallService";
import { Call } from "@interfaces/Data";

import { validationResult } from "express-validator/check";

import Context from "@interfaces/Context";

const webhookHandler = ({ pubSub }: Context): any => async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const call: Call = req.body;
    const { type } = call;

    if (type === "call.new") {
      await CallService.newCall(call);
      pubSub.publish("calls", {
        call: {
          mutation: "CREATED",
          data: call,
        },
      });
    } else if (type === "call.standby") {
      await CallService.standBy(call);
      pubSub.publish("calls", {
        call: {
          mutation: "UPDATED",
          data: call,
        },
      });
    } else {
      await CallService.update(call);
      pubSub.publish("calls", {
        call: {
          mutation: "UPDATED",
          data: call,
        },
      });
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal server error", info: err.message });
  }
};

export default webhookHandler;
