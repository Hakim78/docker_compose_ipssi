import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://api.ipssi/api/login', {
                username: loginUsername,
                password: loginPassword
            });
            setMessage(response.data.message);
            setIsLoggedIn(true);
            fetchUsers();
        } catch (error) {
            setMessage('Erreur de connexion');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://api.ipssi/api/users', {
                username: registerUsername,
                password: registerPassword
            });
            setMessage('Inscription réussie');
            setRegisterUsername('');
            setRegisterPassword('');
        } catch (error) {
            setMessage('Erreur d\'inscription');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://api.ipssi/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="container mx-auto p-4">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl mb-4">Connexion</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                            Se connecter
                        </button>
                    </form>

                    <h2 className="text-2xl mt-8 mb-4">Inscription</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                            S'inscrire
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <button 
                onClick={() => setIsLoggedIn(false)} 
                className="mb-4 bg-red-500 text-white p-2 rounded"
            >
                Déconnexion
            </button>
            <h2 className="text-2xl mb-4">Liste des utilisateurs</h2>
            <div className="grid gap-4">
                {users.map(user => (
                    <div key={user.id} className="p-4 border rounded">
                        <p>Username: {user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;