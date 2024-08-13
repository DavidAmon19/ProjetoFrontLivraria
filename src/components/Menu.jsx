import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <img src="/logo.png" alt="Logo da livraria" />
      </div>

      <div>
        <input type="text" placeholder="Pesquisar livros..." />
      </div>

      <div>
        <button onClick={() => navigate("/emprestimos")}>Emprestimos</button>
        <button onClick={() => navigate("/perfil")}>Pefil</button>
      </div>
    </header>
  );
};

export default Menu;
