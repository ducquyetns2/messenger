import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navigation from './components/navigation'
import HomePage from './pages/homePage'
import FormLog from './pages/login'
import Messenger from './pages/messenger'
import { routes } from './store/constant'

function App() {
  const userId = useSelector(state => state.user._id)
  return (
    <div className="App">
      <Routes>
        <Route path={routes.login} element={<FormLog />}></Route>
        <Route path={routes.home} element={<Navigation />}>
          <Route index element={(userId) ? <HomePage /> : <Navigate to='/login' />}></Route>
          <Route path={routes.messenger} element={(userId) ? <Messenger /> : <Navigate to='/login' />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
