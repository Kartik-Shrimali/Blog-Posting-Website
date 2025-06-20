import { Hono } from 'hono'
import {userRouter} from "./routes/user"
import {blogRouter} from "./routes/blog"
import {authMiddleware} from "./middleware"
import {cors} from 'hono/cors'

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>()

app.use('/*' , cors())
app.use('/api/v1/blog/*' , authMiddleware)
app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog' , blogRouter)

export default app
