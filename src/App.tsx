import axios from "axios";
import { useState } from "react";
import "./App.css";

type GithubData = {
  name: string;
  bio: string;
  avatar_url: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [avatar_url, setAvatarURL] = useState("Loading...");
  const [showContainer, setShowContainer] = useState(false);

  const handlePesquisa = () => {
    console.log("Consultando usuário:", username); // Log para depuração
    axios
      .get<GithubData>(`https://api.github.com/users/${username}`)
      .then((response) => {
        console.log("Resposta da API:", response.data); // Log para depuração
        setName(response.data.name);
        setBio(response.data.bio);
        setAvatarURL(response.data.avatar_url);
        setShowContainer(true);
      })
      .catch((error) => {
        console.error("Erro na API:", error); // Log para depuração
        setShowContainer(false);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePesquisa();
  };

  return (
    <div className="container-geral">
      <h1>GIT PESQUISA</h1>
      <div className="form">
        <h2>Insira o nome de usuário</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o Usuário"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <button type="submit">Consultar</button>
        </form>
      </div>

      {showContainer && ( // Condicional para mostrar a div container
        <div className="container">
          <header>Projeto EMIDES2AM</header>
          <main>
            <div className="conteudo">
              <div>
                <img src={avatar_url} alt="Avatar" />
                <h1>{name}</h1>
                <hr />
                <h1>Biografia:</h1>
                <p>{bio}</p>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
