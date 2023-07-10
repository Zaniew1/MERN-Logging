import './App.css';
import { LoginComponent } from './components/login';
function App() {


  return (
    <main className="container mx-auto bg-gray-200" >
      <div>
        <button className='text-4xl' >Sign up</button>
      </div>
      <div>
        <LoginComponent/>
      </div>
    </main>
    
  )
}

export default App
