import { useState,useEffect} from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {  
  const [todos,setTodos] = useState([])
  // fetch("http://localhost:3000/todos").then(
  //   async function(res){
  //     const result= await res.json()
  //     setTodos(result.todos)
  //   })
  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("http://localhost:3000/todos");
        const result = await response.json();
        console.log('Fetched data:', result);
        if (response.ok) {
          setTodos(result);
        } else {
          console.error('Error fetching data:', result.message);
        }
    };
    fetchData();
  }, []);
  return (
    <>
      <CreateTodo/>
      <Todos todos={todos}/>
    </>
  )
}
export default App