import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import { AppLogin } from './components/AppLogin';

// API
// https://dummyjson.com/products

function App() {
  const [logged, setIsLogged] = useState(false);
  const [info, setInfo] = useState("");

  const userLogin = (email, password) => {
    if (password === '' || email === '') {
      setInfo("Cumplimente los campos.");
    } else if (email === "myfpschool@mail.com" && password === "2023") {
      setIsLogged(true);
      setInfo("");
    } else {
      setInfo("Datos incorrectos.");
    }
  }

  let navigate = useNavigate();
  if (logged) {
    navigate("/menu", {
      state: {
        logged
      }
    });
  }

  return (
    <div className="App">
      <AppLogin userLogin={userLogin} info={info} />
    </div>
  );
}

export default App;