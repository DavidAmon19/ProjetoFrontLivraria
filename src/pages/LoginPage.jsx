import React, {useState} from "react";
import axios from "axios";


const LoginPage = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) =>{
        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:9090/usuario/login`,{
                email,
                senha: password,
            });


            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
        } catch (error) {
            console.error("Erro nas credenciais")
        }


    };

    return (

        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input 
                        type="email" 
                        value={email}
                        placeholder="Inserir Email"
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input 
                        type="password"
                        value={password}
                        placeholder="Digite sua senha"
                        onChange={(e)=> setPassword(e.target.value)}
                         />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;