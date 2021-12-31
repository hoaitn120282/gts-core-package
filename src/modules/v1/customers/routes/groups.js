import express from "express";
import groupController from "src/modules/v1/customers/controllers/groups";
const router = express.Router();

/**
 * @apiVersion 1.0.0
 * @api {get} /groups Display the list of groups
 * @apiName group list
 * @apiGroup customer-groups
 * @apiParamExample {json} Request-Example:
 *    {items:[{
 *           "id": 1,
 *           "name": "VIP",
 *     },
 *     "status": 200,
 *     "message": "users.list.success"
 *     ]
 *   }
 * @apiSuccess {Object} Items the list of group information.
 */

router.get("/", groupController.index);

/**
 * @apiVersion 1.0.0
 * @api {get} /groups/:id Show group information
 * @apiName Display group information via ID
 * @apiParam {Integer} Id Mandatory the identify of group information.
 * @apiGroup customer-groups
 *
 *
 * @apiSuccess {Object} group information.
 * @apiSuccess {Integer} Id Optional the identify of group information
 * @apiSuccess {String} Username Optional  username of group
 * @apiSuccess {String} Email Optional email of group
 */
router.get("/:id", groupController.show);

/**
 * @apiVersion 1.0.0
 * @api {post} /groups Create a new group
 * @apiName group creation
 * @apiGroup customer-groups
 * @apiParam {String} Username Optional The field unique username.
 * @apiParam {String} Email Optional The field unique email.
 *
 * @apiSuccess {Object} Items - group information: username, email, status,...
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.post("/", groupController.create);

/**
 * @apiVersion 1.0.0
 * @api {put} /groups/:id Update a group
 * @apiName group updation
 * @apiGroup customer-groups
 * @apiParam {String} Username Users unique username.
 * @apiParam {String} Email Users email.
 *
 * @apiSuccess {Object} Items.
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.put("/:id", groupController.update);

/**
 * @apiVersion 1.0.0
 * @api {delete} /groups/:id Delete a group
 * @apiName group Deletion
 * @apiGroup customer-groups
 * @apiParam {Integer} id Users unique ID.
 *
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.delete("/:id", groupController.delete);

/**
 * @apiVersion 1.0.0
 * @api {delete} /groups/undelete/:id Delete a group
 * @apiName group Deletion
 * @apiGroup customer-groups
 * @apiParam {Integer} id Users unique ID.
 *
 * @apiSuccess {String} Message.
 * @apiSuccess {String} Status.
 */
router.delete("/undelete/:id", groupController.restore);

export default router;
