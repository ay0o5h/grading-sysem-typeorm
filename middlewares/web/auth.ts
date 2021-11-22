import * as jwt from "jsonwebtoken";
import CONFIG from "../../config";
import { User } from "../../src/entity/User";
import { errRes } from "../../utility/util.service";


export default async (req, res, next) => {
    // get the token
    const token = req.headers.token;
    if (!token) return errRes(res, "You need to register");
    // verify token

    try {
        let payload: any;
        payload = jwt.verify(token, CONFIG.jwtUserSecret);
        // get user
        let user = await User.findOne({ where: { id: payload.id, isActive: true } });
        console.log({ user, payload });


        if (!user.isActive) return errRes(res, `the account is not active`);
        req.admin = user;
        // next
        return next();
    } catch (error) {
        return errRes(res, "invalid token");
    }
};