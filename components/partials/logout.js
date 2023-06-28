import { useContext } from 'react'
import { UserContext } from '../../context/user'

function Logout({ className }) {
    const { doLogout } = useContext(UserContext)

    return (
        <button 
            className={className} 
            onClick={() => doLogout()}
            >
            Log Out
        </button>
    )
}

export default Logout