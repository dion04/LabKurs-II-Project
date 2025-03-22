import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])
  const fetchData = async () => {
    const response = await axios.get('http://localhost:8080/api')
    return response.data
  }

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      const data = await fetchData()
      setUsers(data.data)
    }
    fetchAndSetUsers()
  }, [])

  return (
    <>
      <h1>Crowd Sourced News Platform</h1>
      {users.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
