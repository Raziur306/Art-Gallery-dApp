import Routes from './routes/index'
import { getAuth, onAuthStateChanged } from "firebase/auth";

//firebase initialization
import './config/firebaseConfig'

function App() {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            localStorage.setItem('isLoggedIn', true)
        } else {
            localStorage.clear()
        }
    });

    return (
        <Routes />
    )
}

export default App