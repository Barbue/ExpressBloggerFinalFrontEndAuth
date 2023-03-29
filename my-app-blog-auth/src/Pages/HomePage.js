import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/Auth";

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT

const HomePage = () => {
	const [message, setMessage] = useState("")
	// const {userToken} = useAuth()
	const auth = useAuth()
	console.log(auth);

	// console.log(userToken)
	
	useEffect(()=>{
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
			<h1>Home Page</h1>
			<p>Message: {message}</p>
		</div>
	)
}

export default HomePage