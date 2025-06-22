import {useParams} from "react-router-dom"
import {useBlog} from "../hooks/index"
import { FullBlog } from "../components/FullBlog";

export const Blog = () =>{
    const {id} = useParams();
    const {loading , blog} = useBlog( {id : id || ""})

    if (loading || !blog) {
        return <div className="flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
        </div>

    }

    return <div>
        <FullBlog blog = {blog} />
    </div>
}