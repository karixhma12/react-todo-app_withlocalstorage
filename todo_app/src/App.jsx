import {useState} from "react";
import {useEffect} from "react";
import {useRef} from "react"; 


function App(){
    const [todos, setTodos] = useState([]);
    const [todoText,setTodoText] = useState("");

    function addTodo(){
      const todo = {
        id : Date.now(),
        text : todoText,
        done : false
      }
      setTodos([...todos,todo]);
      setTodoText("");
    }

    function deleteTodo(id){
      const todosNew = todos.filter((todo)=>{
        if(todo.id===id){
          return false;
        }
        else{
          return true;
        }
      })

      setTodos(todosNew);
    }

    return(
      <>
        <h1> Todo App </h1>
        <input type="text" placeholder="enter your todo" value={todoText} onChange={e=>{setTodoText(e.target.value)}}></input>
        <button onClick={addTodo}> Add Todo </button>
        <ul>
          {todos.map((todo)=>{
            return(
              <li key={todo.id}>
                {todo.text}
                <button onClick={()=>{deleteTodo(todo.id)}}> Delete </button>
              </li>
            )
          })}
          
        </ul>
        
      </>
    )
}

export default App;