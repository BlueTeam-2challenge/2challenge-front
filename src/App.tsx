import { BrowserRouter as Router } from 'react-router-dom';
import NavButton from "./components/NavButton";

function App() {
  return (
    <>

      {/* adicionar as rotas tendo em mente a interface usada no NavButton */}
      <Router>
        <div>
          <nav>
            <NavButton to="/" label="Home" icon="src\assets\images\Home-icon.png" />
            <NavButton to="/Animais" label="Animais" icon="src\assets\images\Animals-icon.png" />
          </nav>
        </div>
      </Router>

    </>
  );
}

export default App;
