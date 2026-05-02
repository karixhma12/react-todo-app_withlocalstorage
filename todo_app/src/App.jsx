import {useState} from "react";
import {useEffect} from "react";
import {useRef} from "react"; 


function App(){
    const [todos, setTodos] = useState([]);
    const [todoText,setTodoText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTodo,setEditTodo] = useState("");

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

    function editTodoFunc(id){
      const newTodos = todos.map((todo)=>{
        if(id===todo.id){
          return {...todo,text:editTodo};
        }
        else{
          return todo;
        }
      }) 
      
      setEditingId(null);
      setTodos(newTodos);  
      
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

               { (editingId===todo.id) ? 
                  <>
                    <input value={editTodo} onChange={e=>setEditTodo(e.target.value)}></input>
                    <button onClick={()=>{editTodoFunc(todo.id)}}> Save </button>
                    <button onClick={()=>setEditingId(null)}> Cancel </button>
                  </>  

                 : 
                  <>
                    {todo.text}
                    <button onClick={()=>{deleteTodo(todo.id)}}> Delete </button>
                    <button onClick = {()=>{
                                        setEditTodo(todo.text);
                                        setEditingId(todo.id);}}> 
                                        Edit 
                    </button>
                  </>  
                }
                
              </li>
            )
          })}
          
        </ul>
        
      </>
    )
}

export default App;