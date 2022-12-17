import React, {useState, useEffect} from "react";
import axiosClient from "../../services/apiClient";
import {useNavigate} from 'react-router-dom';

const LoginProp = () => {
  const navigate = useNavigate()
  const [error, setError] = useState();

  async function handleLogin(evt) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    setError(undefined)
  
    const request = await axiosClient.post(`${process.env.PUBLIC_URL}/user/log_in`, {rcs_id: username, password: password })
      .catch(err => err)
  
    if(request.status === 200) {
      localStorage.setItem("api_token", request.data.token)
      return navigate("/polls")
    } else {
      setError(`Server error ${request.response.status}!`);
    }
  }

  useEffect(() => {
    if (!error) {
      return;
    }

    setTimeout(() => {
      setError(undefined);
    }, 5000);
  }, [error]);

  const loginWrapperStyles = {
    backgroundColor: "#0369a1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
    padding: "50px",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "11px",
    flexDirection: "column",
    textAlign: "left",
  }

  const labelStyles = {
    color: "white",
    width: "100%",
    marginBottom: "5px"
  }

  const inputStyles = {
    marginBottom: "25px",
    borderRadius: "5px",
    width: "100%",
    padding: "5px"
  }

  const errorStyles = {
    backgroundColor: "red",
    color: "white",
    fontWeight: "700",
    width: "100%",
    textAlign: "center",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px"
  }

  return (
    <>
    <div style={loginWrapperStyles}>
      <img src={"/biglogolol.png"} alt={"Branding"} />
      <p style={{color: "white", marginBottom: "15px"}}>View and create polls by signing in with your RPI credentials.</p>

      {/* Error */}
      {error && (
        <p style={errorStyles}>Error: {error}</p>
      )}

      <label htmlFor="username" style={labelStyles}>UserID</label>
      <input type="text" name="username" id="username" placeholder="Username" style={inputStyles}></input>

      <label htmlFor="password" style={labelStyles}>Password </label>
      <input type="password" name="password" id="password" placeholder="Password" style={inputStyles}></input>
      <input 
            style={{width: "100%", maxWidth: "350px"}}
            type="button"
            value="Login"
            className="btn btn-login"
            onClick={(e) => {
              handleLogin(e);
            }}
          />
      </div>
    </>
  )
};

export default LoginProp;
