import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const sign_up = async (e) => {
		e.preventDefault()
		let register = await actions.sign_up(email, password)
		if (register) {
			let rsp = await actions.getLogin(email, password)
			if (rsp) {
				navigate("/demo")
			}
		}
	}
	return (
		<div className="container">
			<h1>Sign_up</h1>
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
				<button type="button"
					onClick={(e) => sign_up(e)}
					className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
