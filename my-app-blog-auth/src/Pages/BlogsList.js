//import { useState } from "react";
import BlogCard from "../Components/BlogCard";
import { useAuth } from "../Hooks/Auth";
import { useNavigate  } from 'react-router-dom';

//home page component 
const BlogsList = (props) => {
    const auth = useAuth()
    const navigate = useNavigate();

    const {
        blogList, 
        setBlogList, 
        urlEndPoint,
        setShouldRefresh, 
    } = props

    return (
        <div>
               {!auth.userToken && navigate("/login")}
            
            {auth.userToken && <h1>Full Stack Blog App</h1> && blogList.map((item, index) => {
                return (<BlogCard 
                    blog={item} 
                    setBlogList={setBlogList} 
                    urlEndPoint={urlEndPoint}
                    setShouldRefresh={setShouldRefresh}
                    key={index} /> 
                );
            })}
            
        </div>
    )
}

export default BlogsList