import { useState, useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"

 export interface Blog {
    authorname: string,
    title: string,
    content: string,
    PublishedDate: string
    author : {
        name : string
    },
    id : string
}

export const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token")
                let response = await axios.get(`${BACKEND_URL}/api/v1/blog/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setBlog(response.data.blog);
                setLoading(false);
            } catch (e) {
                console.log("there was some error in fetching blogs", e);
            }
        };
        fetchBlogs();
    }, []);

    return {
        loading, blog
    }
}



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem("token")
                let response = await axios.get(`${BACKEND_URL}/api/v1/blog/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (e) {
                console.log("there was some error in fetching blogs", e);
            }
        };
        fetchBlogs();
    }, []);

    return {
        loading, blogs
    }
}