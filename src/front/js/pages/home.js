import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const login = async (e) => {
		e.preventDefault()
		let rsp = await actions.getLogin(email, password)
		if (rsp) {
			navigate("/demo")
		}
	}
	return (
		<div className="container text-center mt-5">
			<div className="row">
				<div className="col">
					<img src="https://cdn-icons-png.flaticon.com/512/5159/5159789.png" style={{ width: "100%", height: "450px" }} />
				</div>
				<div className="col">

					<form>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
							<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
							<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
						</div>
						<div className="mb-3">
							<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
							<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
						</div>
						<button type="button" onClick={(e) => login(e)} className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};
