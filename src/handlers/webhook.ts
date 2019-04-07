import { Request, Response } from "express";

const webhookHandler = (req: Request, res: Response): void => {
  res.status(200).send();
};

export default webhookHandler;
