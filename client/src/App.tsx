import { Routes, Route } from 'react-router-dom';
import { RegistrationLoginPage } from './components/RegistrationLoginPage';
import { Home } from './components/Home';
import './index.css';
import './style.css';
function App() {

  return (
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path={'/login'} element={<RegistrationLoginPage/>}></Route>
        <Route path={'/resetPassword'} element={<RegistrationLoginPage/>}></Route>
      </Routes>
      
  )
}

export default App
