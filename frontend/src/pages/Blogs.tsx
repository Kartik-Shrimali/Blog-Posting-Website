import { Appbar } from "../components/Appbar"
import { Blog_Cards } from "../components/Blog_Card"
import { useBlogs } from "../hooks/index"



export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
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