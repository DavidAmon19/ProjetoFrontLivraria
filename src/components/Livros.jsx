import axios from "axios";
import React, { useState, useEffect } from "react";

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setlivroSelecionado] = useState(null);

  useEffect(() => {
    const pegarLivros = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/livros`);
        setLivros(response.data);
        if(response.data.length > 0) {
          setlivroSelecionado(response.data[0])
        }
      } catch (error) {
        console.error("Erro ao buscar livros", error);
      }
    };

    pegarLivros();
  }, []);

  const handleSelectLivro = (livro) => {
    setlivroSelecionado(livro);
  };

  const hundlePegarEmprestado = async () => {
    const confirmar = window.confirm(
      `Você deseja pegar o livro ${livroSelecionado.titulo} emprestado?`
    );
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const usuario_id = localStorage.getItem("id");
        await axios.post(
          "http://localhost:9090/emprestimos",
          {
            usuario_id: usuario_id,
            livro_id: livroSelecionado.id,
            dataEmprestimo: new Date(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Livro emprestado com sucesso!!");
      } catch (error) {
        console.error(`Erro ao realizar emprestimo ${error}`);
        alert("Erro ao realizar emprestimo do livro");
      }
    }
  };

  return (
    <div>
      <div>
        {livros.map((livro) => (
          <div key={livro.id} onClick={() => handleSelectLivro(livro)}>
            <h3>{livro.titulo}</h3>
            <img src={livro.imagem} alt={livro.titulo} />
          </div>
        ))}
      </div>
      {livroSelecionado && (
        <div>
          <h2>{livroSelecionado.titulo}</h2>
          <p>{livroSelecionado.autor}</p>
          <img src={livroSelecionado.imagem} alt={livroSelecionado.titulo} />
          <p>
            Descrição: Este é um ótimo livro sobre {livroSelecionado.titulo}.
          </p>
          <button onClick={hundlePegarEmprestado}>Pegar emprestado</button>
        </div>
      )}
    </div>
  );
};

export default Livros;
