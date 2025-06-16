import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from "@prisma/extension-accelerate"
import { decode, sign, verify } from "hono/jwt"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()


userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();

        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            }
        })

        const payload = {
            email: body.email,
            id: user.id
        }

        const token = sign(payload, c.env.JWT_SECRET);

        return c.json(token)

    } catch (e) {
        console.log(e)
        c.status(411)
        return c.text("internal server error")
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {

        const body = await c.req.json();

        const response = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!response) {
            return c.json({
                error: "User not found"
            })
        }

        const payload = {
            email: body.email,
            id: response.id
        }

        const token = sign(payload, c.env.JWT_SECRET)

        return c.json({
            msg: "signin successful",
            token: token
        })
    } catch (e) {
        console.log(e)
        c.status(411);
        return c.text("internal server error ")
    }

})