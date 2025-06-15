import { Hono } from 'hono'
import {PrismaClient} from "@prisma/client"
import {withAccelerate} from "@prisma/extension-accelerate"
import {decode ,sign , verify} from "hono/jwt"



const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>()

//middleware

app.use('/api/v1/blog/*' , async (c , next)=>{
  const header = c.req.header("Authorization");

  if(!header){
    return c.json({
      msg : "header is not present"
    })
  }

  const token = header.split(" ")[1];

  if(!token){
    c.status(401)
    return c.json({
      msg : "Token is not sent",
    })
  }

  const verified_token = await verify(token , c.env.JWT_SECRET);

  if(!verified_token){
    c.status(403);
    return c.json({
      msg : "Unauthorized access"
    })
  }

  await next()
})

app.post('/api/v1/signup' , async (c) => {
  
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user =  await prisma.user.create({
    data : {
      email : body.email,
      name : body.name,
      password : body.password
    }
  })

  const payload = {
    email : body.email,
    id : user.id
  }

  const token = sign(payload , c.env.JWT_SECRET);

  return c.json(token)

})

app.post('/api/v1/signin' ,async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends (withAccelerate());

  const body = await c.req.json();

  const response = await prisma.user.findUnique({
    where : {
      email : body.email,
      password : body.password
    }
  })

  if(!response){
    return c.json({
      error : "User not found"
    })
  }

  const payload = {
    email : body.email,
    id : response.id
  }

  const token = sign(payload , c.env.JWT_SECRET)

  return c.json({
    msg : "signin succe ssful",
    token : token
  })
})

app.post('/api/v1/blog' , (c)=>{

})

app.put('/api/v1/blog' , (c)=>{

})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})



export default app
