import { Routes, Route } from 'react-router-dom';
import { RegistrationLoginPage } from './components/Auth/RegistrationLoginPage';
import { Home } from './components/HomePage/Home';
import { ForgetPassword } from './components/Auth/ForgetPassword';
import { ResetPassword } from './components/Auth/ResetPassword';
import './index.css';
import './style.css';
function App() {

  return (
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path={'/login'} element={<RegistrationLoginPage/>}></Route>
        <Route path={'/resetPassword/:token'} element={<ResetPassword/>}></Route>
        <Route path={'/forgetPassword'} element={<ForgetPassword/>}></Route>
      </Routes>
      
  )
}

export default App
