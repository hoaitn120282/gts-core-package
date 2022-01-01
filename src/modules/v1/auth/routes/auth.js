import express from "express";
import memberController from "src/modules/v1/auth/controllers/auth";
const router = express.Router();

/**
 * @apiVersion 1.0.0
 * @api {get} /auth/:id check user public address
 * @apiName Display member information via Identify
 * @apiParam {String} publicAddress Mandatory the identify of member information.
 * @apiGroup Authentication
 *
 *
 * @apiSuccess {Object} Member information.
 * @apiSuccess {String} nonce The identify of number to generate signature for client
 */
router.get("/:publicAddress", memberController.check);
/**
 * @apiVersion 1.0.0
 * @api {post} /generate Create a signature
 * @apiName Signature creation
 * @apiGroup Authentication
 * @apiParam {String} Username Optional The field unique username.
 * @apiParam {String} Email Optional The field unique email.
 *
 * @apiSuccess {Object} Items - member information: username, email, status,...
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.post("/generate", memberController.generateSignature);

/**
 * @apiVersion 1.0.0
 * @api {post} /auth Create a new member
 * @apiName Authentication veirification
 * @apiGroup Authentication
 * @apiParam {String} signature Reqiured The field unique.
 * @apiParam {String} publicAddress Reqiured The field unique.
 *
 * @apiSuccess {Object} Items - Token string
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.post("/", memberController.login);

export default router;
