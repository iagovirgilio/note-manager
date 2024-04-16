import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../auth";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formName = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (method === "login") {
                await login(username, password);
                navigate("/");
            } else {
                await register(username, password);
                navigate("/login");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            // Trate o erro de forma mais robusta aqui, como exibindo uma mensagem de erro na UI
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{formName}</h1>
            <input 
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input 
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {isLoading && <LoadingIndicator />}
            <button className="form-button" type="submit">{formName}</button>
        </form>
    )
}

export default Form;
