import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { decode, sign, verify } from "hono/jwt"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    }
    Variables : {
        userId : string
    }
}>()

blogRouter.post('/blog', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    try {
        const body = await c.req.json();
        if (!body) {
            return c.text("No data sent")
        }

        const response = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: body.published,
                userId: c.get("userId")
            }

        })

        if (!response) {
            return c.text("failed to make entry in database")
        }

        return c.json({
            id: response.id
        })
    } catch (e) {
        console.log(e)
        c.status(411)
        return c.text("there was some internal server error ")
    }
})

blogRouter.put('/blog', async (c) => {
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        if (!body) {
            return c.text("No data was sent");
        }

        const response = prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        if (!response) {
            return c.text("the post was not updated")
        }

        return c.json({
            message: "sucessfully updated",
        })
    } catch (e) {
        console.log(e)
        c.status(411)
        return c.text("there was some internal server error")
    }
})

blogRouter.get('/blog/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany();

        if(!blogs){
            return c.text("no blogs found")
        }

        return c.json({
            blogs
        })
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text("there was some internal server error")
    }
})

blogRouter.get('/blog/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })

        if (!blog) {
            return c.text("no blog found")
        }

        return c.json({
            message: "Post found successfully",
            blog
        }
        )
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text("there was some internal server error")
    }
})


