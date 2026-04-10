import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=10')
      .then(res => {
        if (!res.ok) throw new Error('Error HTTP: ' + res.status)
        return res.json()
      })
      .then(data => {
        setUsuarios(data.users)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p className="estado">Cargando usuarios...</p>
  if (error)    return <p className="estado error">Error: {error}</p>

  return (
    <div className="contenedor">
      <h1>Empresa XYZ — Directorio de Usuarios</h1>
      <p className="fuente">Fuente: dummyjson.com/users</p>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App