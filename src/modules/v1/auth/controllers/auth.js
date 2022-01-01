import jwt from "jsonwebtoken";
import { recoverPersonalSignature } from "eth-sig-util";
import { bufferToHex } from "ethereumjs-util";
import authModel from "src/modules/v1/user/repositories/user";
import helper from "src/common/helper";
import APIError from "src/common/APIError";
import httpStatus from "http-status";
import Web3 from "web3";
import Personal from "web3-eth-personal";
const controller = {};

/**
 *  Check user address exsit & create nonce
 * @param {*} req
 * @param {*} res
 */
controller.check = (req, res, next) => {
        const options = {
                where: { publicAddress: req.params.publicAddress.toLowerCase() }
        };

        const authRepos = new authModel();
        const userObj = {};
        userObj.nonce = Math.floor(Math.random() * 10000);
        userObj.publicAddress = req.params.publicAddress.toLowerCase();
        return authRepos.findOne(options)
                .then((data) => {
                        if (!data) {
                                authRepos.create(userObj).then(() => {
                                        return next();
                                }).catch((e) => next(e));
                        } else {
                                authRepos.update(userObj, {
                                        where: {
                                                id: data.id
                                        }
                                }).then(() => {
                                        return next();
                                }).catch((e) => next(e));
                        }
                        return res.json(helper.formatOutputData(userObj, "user.check.success"));
                })
                .catch((e) => next(e));
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
controller.generateSignature = (req, res, next) => {
        const nonce = req.body.nonce;
        const publicAddress = req.body.publicAddress.toLowerCase();
        const web3 = new Web3(new Web3.providers.HttpProvider("https://api.avax-test.network/ext/bc/C/rpc"));
        const signature =web3.eth.personal.sign(web3.utils.utf8ToHex("Hello world"), "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
        .then(console.log);
        return { publicAddress, signature };

        
        
}

/**
 * User authentication
 * @param {*} req
 * @param {*} res
 */
controller.login = (req, res, next) => {
        const publicAddress = req.body.publicAddress.toLowerCase();
        const signature = req.body.signature;
        const options = {
                where: { publicAddress: publicAddress }
        };
        if (!signature || !publicAddress)
                return res.status(401).json({ msg: "publicAddress & signature must be required!" });

        const membersRepos = new authModel();
        membersRepos.findOne(options)
                //////////////////////////////////////////////////////
                // Step 1: Get the user with the given publicAddress//
                //////////////////////////////////////////////////////
                .then((user) => {
                        if (!user) {
                                res.status(401).send({
                                        error: `User with publicAddress ${publicAddress} is not found in database`,
                                });

                                return null;
                        }
                        return user;
                })
                ///////////////////////////////////////
                // Step 2: Verify digital signature////
                ///////////////////////////////////////
                .then((user) => {
                        if (!(user)) {
                                // Should not happen, we should have already sent the response
                                const err = new APIError('User is not defined in "Verify digital signature".', httpStatus.UNAUTHORIZED, true);
                                return next(err);
                        }

                        const msg = `I am signing my one-time nonce: ${user.nonce}`;

                        // We now are in possession of msg, publicAddress and signature. We
                        // will use a helper from eth-sig-util to extract the address from the signature
                        const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
                        const address = recoverPersonalSignature({
                                data: msgBufferHex,
                                sig: signature,
                        });

                        // The signature verification is successful if the address found with
                        // sigUtil.recoverPersonalSignature matches the initial publicAddress
                        if (address.toLowerCase() === publicAddress.toLowerCase()) {
                                return user;
                        } else {
                                res.status(401).send({
                                        error: 'Signature verification failed',
                                });

                                return null;
                        }
                })
                ///////////////////////////////////////////////
                // Step 3: Generate a new nonce for the user///
                ///////////////////////////////////////////////
                .then((user) => {
                        if (!(user)) {
                                // Should not happen, we should have already sent the response
                                const err = new APIError('User is not defined in "Verify digital signature".', httpStatus.UNAUTHORIZED, true);
                                return next(err);
                        }

                        user.nonce = Math.floor(Math.random() * 10000);
                        return user.save();
                })
                /////////////////////////
                // Step 4: Create JWT////
                /////////////////////////
                .then((user) => {
                        return new Promise((resolve, reject) =>
                                jwt.sign(
                                        {
                                                payload: {
                                                        id: user.id,
                                                        publicAddress,
                                                },
                                        },
                                        process.env.JWT_SECRET,
                                        {
                                                algorithm: process.env.ALGORITHMS,
                                        },
                                        (err, token) => {
                                                if (err) {
                                                        return reject(err);
                                                }
                                                if (!token) {
                                                        return new Error('Empty token');
                                                }
                                                return resolve(token);
                                        }
                                )
                        );
                })
                .then((accessToken) => res.json({ accessToken }))
                .catch(next);
}

export default controller;
