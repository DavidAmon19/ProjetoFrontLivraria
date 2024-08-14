import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBooksPage = async () => {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    autor: "",
    imagem: "",
  });

  useEffect(() => {
    const buscarLivros = async () => {
      try {
        const response = await axios.get("http://localhost:9090/livros");
        setLivros(response.data);
      } catch (error) {
        console.error(`Não foi possivel buscar os livros do backend ${error}`);
      }
    };
    buscarLivros();
  }, []);

  const handleCreateLivro = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:9090/livros`, novoLivro, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`Livro criado com sucesso`);
      setNovoLivro({ titulo: "", autor: "", imagem: "" });
    } catch (error) {
      console.error(`Erro ao criar livro ${erro}`);
      alert(`Não foi possivel criar o livro`);
    }
  };

  const handleDeleteLivro = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9090/livros/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Livro deletado com sucesso");
    } catch (error) {
      console.error(`Erro deletar livro ${erro}`);
      alert(`Não foi possivel deletar o livro`);
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Livros</h2>
      <div>
        <h3>Criar Novo Livro</h3>
        <input
          type="text"
          name="titulo"
          placeholder="Digite o titulo do livro"
          value={novoLivro.titulo}
        />

        <input
          type="text"
          name="autor"
          placeholder="Digite o nome do autor"
          value={novoLivro.autor}
        />
        <input
          type="text"
          name="imagem"
          placeholder="Cole a URL da imagem"
          value={novoLivro.imagem}
        />
        <button onClick={handleCreateLivro}> Criar Livro</button>
      </div>

      <div>
        <h3>Livros Existentes</h3>
        <ul>
            {livros.map((livro)=> (
                <li key={livro.id}>
                    <img 
                    src={livro.imagem} 
                    alt={livro.titulo} />
                    {livro.titulo} --- {livro.autor}
                    <button onClick={()=> handleDeleteLivro(livro.id)}>Deletar Livro</button>
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};


export default AdminBooksPage;