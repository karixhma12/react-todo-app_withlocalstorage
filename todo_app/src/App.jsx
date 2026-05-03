import {useState} from "react";
import {useEffect} from "react";
import "./App.css";


function App(){
    
    const [todoText,setTodoText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTodo,setEditTodo] = useState("");

    //load todos from localStorage as the initial state 
    const [todos,setTodos] = useState(()=>{
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    })

    //save to LocalStorage whenever there is a change in the todos array 
    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])

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

    function toggleTodo(id){
      const newTodo = todos.map((todo)=>{
        if(todo.id===id){
          return {...todo, done: !todo.done}
        }
        else{
          return todo;
        }
      })
      setTodos(newTodo);
    }

    return(
      <div className="container">
        <>
        <h1> Todo App </h1>
        <div className="input-row">
          <input type="text" placeholder="enter your todo" value={todoText} onChange={e=>{setTodoText(e.target.value)}} onKeyDown={
            e=>{
              if(e.key==="Enter"){
                addTodo();
              }
            }
          }></input>
          <button onClick={addTodo}> Add Todo </button>
        </div>  
        <ul>
          {todos.map((todo)=>{
            return(
              <li key={todo.id}>

               { (editingId===todo.id) ? 
                  <>
                    <input value={editTodo} onChange={e=>setEditTodo(e.target.value)} onKeyDown={
                      e=>{
                        if(e.key==="Enter"){
                          editTodoFunc(todo.id)
                        }
                      }
                    }></input>
                    <button className="btn-save" onClick={()=>{editTodoFunc(todo.id)}}> Save </button>
                    <button className="btn-cancel" onClick={()=>setEditingId(null)}> Cancel </button>
                  </>  

                 : 
                  <>
                    <span className="todo-text" onClick={()=>{toggleTodo(todo.id)}} style={{textDecoration: todo.done ? "line-through" : "none", opacity: todo.done? 0.5 : 1}}>
                      {todo.text}
                    </span>
                    <div classname="todo-buttons">    
                      <button className="btn-delete" onClick={()=>{deleteTodo(todo.id)}}> Delete </button>
                      <button className="btn-edit" onClick = {()=>{
                                          setEditTodo(todo.text);
                                          setEditingId(todo.id);}}> 
                                          Edit 
                      </button>
                    </div>  
                  </>  
                }
                
              </li>
            )
          })}
          
        </ul>
        
        </>
      </div>
    )
}

export default App;