import { Appbar } from "../components/Appbar"
import { Blog_Cards } from "../components/Blog_Card"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/index"



export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>

    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="">
                {blogs.map(blog=><Blog_Cards 
                id = {blog.id}
                authorname = {blog.author.name || "Anonymous"}
                title = {blog.title}
                content = {blog.content} 
                PublishedDate = "20 June 2025"
                 />)}
            </div>
        </div>
    </div>
}