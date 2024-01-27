import './navigation.scss'
import { useRef } from 'react'
import UserAPI from '../../services/UserAPI'
import { actions } from '../../store/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, NavLink } from 'react-router-dom'
import { routes, socketUrl } from '../../store/constant'
import { io } from 'socket.io-client'
function Navigation() {
    const dispatch = useDispatch()
    const socket = useRef(io(socketUrl))
    const user = useSelector(state => state.user)
    const handleLogOut = async () => {
        const response = await UserAPI.logoutUser()
        if (!response.error) {
            dispatch(actions.removeUser())
            socket.current.emit('removeUser', user)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand text-primary" href="#">
                        <img className='navbar-image me-2' src={user?.avatarPath} />
                        {user?.useName}
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="nav-link" to={routes.home}>Home</NavLink>
                            <NavLink className="nav-link" to={routes.messenger}>Messenger</NavLink>
                        </ul>
                        <button className=' me-4 btn btn-outline-primary' onClick={handleLogOut}>Log out</button>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}
export default Navigation