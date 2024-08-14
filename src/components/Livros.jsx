import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import styles from './Livros.module.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get('http://localhost:9090/livros');
        setLivros(response.data);
        if (response.data.length > 0) {
          setLivroSelecionado(response.data[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchLivros();
  }, []);

  const handleSelectLivro = (livro) => {
    setLivroSelecionado(livro);
  };

  const handlePegarEmprestado = async () => {
    const confirmar = window.confirm(`Você deseja pegar o livro "${livroSelecionado.titulo}" emprestado?`);
    if (confirmar) {
      try {
        const token = localStorage.getItem('token');
        const usuario_id = localStorage.getItem('id');
        await axios.post('http://localhost:9090/emprestimos', 
          {
            usuario_id: usuario_id,
            livro_id: livroSelecionado.id,
            dataEmprestimo: new Date(),
          }, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        alert('Livro emprestado com sucesso!');
      } catch (error) {
        console.error('Erro ao pegar emprestado:', error);
        alert('Erro ao pegar livro emprestado.');
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className={styles.container}>
      <div className={styles.carrossel}>
        <Slider {...settings}>
          {livros.map((livro) => (
            <div key={livro.id} onClick={() => handleSelectLivro(livro)}>
              <img
                src={livro.imagem}
                alt={livro.titulo}
                className={styles.livroImg}
              />
              <h3>{livro.titulo}</h3>
            </div>
          ))}
        </Slider>
      </div>
      {livroSelecionado && (
        <div className={styles.detalhes}>
          <h2>{livroSelecionado.titulo}</h2>
          <p>{livroSelecionado.autor}</p>
          <img src={livroSelecionado.imagem} alt={livroSelecionado.titulo} className={styles.detalhesImg} />
          <p>Descrição: Este é um ótimo livro sobre {livroSelecionado.titulo}.</p>
          <button onClick={handlePegarEmprestado}>Pegar Emprestado</button>
        </div>
      )}
    </div>
  );
};

export default Livros;
