import { decode, sign, verify } from "hono/jwt"
import { MiddlewareHandler } from "hono"


export const authMiddleware: MiddlewareHandler<{
    Bindings: {
        JWT_SECRET: string
    }
}> = async (c, next) => {
    const header = c.req.header("Authorization");

    if (!header) {
        return c.json({
            msg: "header is not present"
        })
    }

    const token = header.split(" ")[1];

    if (!token) {
        c.status(401)
        return c.json({
            msg: "Token is not sent",
        })
    }

    const verified_token = await verify(token, c.env.JWT_SECRET);

    if (!verified_token) {
        c.status(403);
        return c.json({
            msg: "Unauthorized access"
        })
    }

    await next()
}

