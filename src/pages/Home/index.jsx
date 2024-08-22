// Importando as dependencias
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'
import { useState, useEffect, useRef } from 'react'

// Definindo o componente Home
function Home() {

  // Usando o hook useState para definir e gerenciar o estado do array de usuarios
  const [users, setUsers] = useState([])

  // Usando o hook useRef para criar referencias e gerenciar o estado do array de usuarios
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  // Função assincrona para buscar usuarios de API e atualizar o estado
  async function getUsers() {
     
    const usersFromApi = await api.get('/usuarios')
     setUsers(usersFromApi.data)
  } 

  // Função assincrona para criar um novo usuarios enviando uma requisicao POST para a API e atualizar o estado
  async function createUsers() {
    
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })

    getUsers()
  }

  // Função assincrona para excluir um usuario enviando uma requisicao DELETE para a API e atualizar o estado
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  // executa ao carregar a pagina
  // Hook useEffect para buscar a lista inicial
  useEffect(() => {
    getUsers()
  }, [])  

  // Renderiza o componente
  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuarios</h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputName}/>
        <input placeholder="Idade" name="idade" type="number" ref={inputAge} />
        <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
          <i class="fa fa-trash-o"></i>
          </button>
        </div>
      ))}

    </div>
  )
}

// Exportando o componente Home
export default Home
