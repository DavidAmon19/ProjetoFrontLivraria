import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './AdminBooksPage.module.css';

const AdminBooksPage = () => {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    autor: "",
    imagem: "",
  });

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get("http://localhost:9090/livros");
        setLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    };

    fetchLivros();
  }, []);

  const handleInputChange = (e) => {
    setNovoLivro({ ...novoLivro, [e.target.name]: e.target.value });
  };

  const handleCreateLivro = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:9090/livros", novoLivro, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Livro criado com sucesso!");
      setNovoLivro({ titulo: "", autor: "", imagem: "" });
    } catch (error) {
      console.error("Erro ao criar livro:", error);
      alert("Erro ao criar livro.");
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
      alert("Livro deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      alert("Erro ao deletar livro.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciamento de Livros</h2>
      <div className={styles.novoLivro}>
        <h3>Criar Novo Livro</h3>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imagem"
          placeholder="URL da Imagem"
          value={novoLivro.imagem}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateLivro}>Criar Livro</button>
      </div>
      <div className={styles.livrosExistentes}>
        <h3>Livros Existentes</h3>
        <ul>
          {livros.map((livro) => (
            <li key={livro.id}>
              <img
                key={livro.id}
                src={livro.imagem}
                alt={livro.titulo}
                onClick={() => handleSelectLivro(livro)}
                style={{
                  cursor: "pointer",
                  margin: "10px",
                  width: "100px",
                  height: "150px",
                }}
              />
              {livro.titulo} - {livro.autor}
              <button onClick={() => handleDeleteLivro(livro.id)}>
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminBooksPage;
