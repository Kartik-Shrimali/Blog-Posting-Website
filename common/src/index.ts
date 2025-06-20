import z from "zod"

export const signupInput = z.object({
    email : z.string().email(),
    name : z.string(),
    password : z.string().min(5 , "The password should be of atleast 5 letters")
})

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string()
})

export const createBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    published : z.boolean().optional()
})

export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id : z.union([z.string(),z.number()])
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>