import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/index"
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" })

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-4 pt-10">
                <FullBlogSkeleton />
            </div>
        );
    }
    if (!blog) {
        return (
            <div className="text-center text-red-500 pt-10">
                Blog not found.
            </div>
        );
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
}