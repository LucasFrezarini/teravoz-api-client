import { check } from "express-validator/check";

const validator = [
  check("type")
    .exists()
    .withMessage("Type is required!"),
  check("call_id")
    .exists()
    .withMessage("call_id is required!"),
  check("code")
    .exists()
    .withMessage("code is required!"),
  check("direction")
    .exists()
    .withMessage("direction is required!"),
  check("our_number")
    .exists()
    .withMessage("our_number is required!"),
  check("their_number")
    .exists()
    .withMessage("their_number is required!"),
  check("their_number_type")
    .exists()
    .withMessage("their_number_type is required"),
];

export default validator;
