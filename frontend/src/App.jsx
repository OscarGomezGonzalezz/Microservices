import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    //TODO: FIX THAT SERVER MAY SEND INDEX.HTML INSTEAD OF THE ACTUAL ANSWER WHICH SHOULD BE []
    fetch("/api/data")
    //Desde el navegador: El fetch se realiza a http://127.0.0.1:54397/api/data (o el puerto que tenga tu dev server).
    //Internamente, en Vite: La solicitud se intercepta y se reenvía a http://backend-service:3000/api/data.
      .then((res) => {
        console.log(res);  // Ver la respuesta de la API
        return res.text();  // Obtenemos el cuerpo como texto
      })
      .then((text) => {
        console.log(text);  // Ver el texto de la respuesta
        try {
          const json = JSON.parse(text);  // Intentar parsear el texto como JSON
          setData(json);
        } catch (err) {
          console.error('Error al parsear JSON:', err);
        }
      })
      .catch((err) => console.error('Error de red:', err));
  }, []);
  
  

//Cuando el navegador carga la aplicación, lo primero que hace es descargar index.html (lo que ves en el Network tab) y 
//luego ejecuta el código JavaScript que renderiza tu aplicación (el contenido que ves en la ventana del navegador).
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h1>Frontend conectado al Backend</h1>
        <p>{data ? data : "Cargando datos..."}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
