import React from "react";
import Menu from "../components/Menu";
import AdminBooksPage from "./AdminBooksPage";
import Livros from "../components/Livros";



const HomePage = () =>{
    const role = localStorage.getItem("role");

    return (
        <div>
        <Menu />
        {role === 'admin' ? (
            <AdminBooksPage />
        ) : (
            <Livros />
        )}
        </div>
    )
}


export default HomePage;