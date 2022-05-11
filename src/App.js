import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/reducers/userReducer';

function App() {
    const user = null;
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                //Logged In
                dispatch(
                    login({
                        uid: userAuth.uid,
                        email: userAuth.email,
                    })
                );
            } else {
                //Logged Out
                dispatch(logout);
            }
        });
        return unsubscribe;
    }, []);
    return (
        <div className="App">
            <Router>
                {!user ? (
                    <LoginPage />
                ) : (
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                    </Routes>
                )}
            </Router>
        </div>
    );
}

export default App;
