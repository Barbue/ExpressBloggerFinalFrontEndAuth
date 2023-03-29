import { useState, useEffect } from "react";
import BlogCard from "../Components/BlogCard";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT

//home page component 
const HomePage = (props) => {
    const navigate = useNavigate() 
    const [message, setMessage] = useState("")
    const auth = useAuth()
    console.log(auth)

    const {
        blogList, 
        setBlogList, 
        urlEndPoint,
        setShouldRefresh, 
    } = props

    useEffect(()=>{
        // if(auth.userToken){}
		const fetchMessage = async () => {
			const headers = {
				"Content-Type": "application/json",
				// [process.env.REACT_APP_TOKEN_HEADER_KEY]: auth.userToken
			}

			headers[process.env.REACT_APP_TOKEN_HEADER_KEY] = auth.userToken
			// headers.process.env.REACT_APP_TOKEN_HEADER_KEY = auth.userToken

			console.log(headers)

			const response = await fetch(`${urlEndpoint}/users/message`, {
				method: "GET",
				headers: headers,
			});
			const responseJSON = await response.json();
			console.log(responseJSON)
			setMessage(responseJSON.message)
		}
		if (auth.userToken !== null) {
			fetchMessage()
		}
		if (auth.userToken === null) {
			setMessage("")
		}
	}, [auth.userToken])

	

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

export default HomePage
