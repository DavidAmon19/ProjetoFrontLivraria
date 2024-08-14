import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';


const Menu = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.menu}>
      <div className={styles.logo}>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Pesquisar livros..." />
      </div>
      <div className={styles.menuButtons}>
        <button onClick={() => navigate('/emprestimos')}>Empréstimos</button>
        <button onClick={() => navigate('/perfil')}>Perfil</button>
      </div>
    </header>
  );
};

export default Menu;
