import './App.css';
import Todoarea from './components/todoarea';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <div  className='header'>
        <h1>TODOLIST</h1>
      </div>
      <Todoarea />
    </div>
  );
}

export default App;
