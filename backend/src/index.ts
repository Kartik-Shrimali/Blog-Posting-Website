import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/signup' , async (c) => {
  const body = await c.req.json();
  const {username , password} = body;

  return c.text("message received");
})

app.post('/api/v1/signin' , (c)=>{

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
