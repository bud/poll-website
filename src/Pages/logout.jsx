import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";

const Logout = () => {
const navigate = useNavigate()
localStorage.clear()

return useEffect(() => {
    navigate("/login")
}, [])
};

export default Logout;
