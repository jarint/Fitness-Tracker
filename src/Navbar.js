import './App.css'
import { Link } from 'react-router-dom'

export default function navbar() {
    return(
        <div>
            <Link to="/">
                <button className= 'navbar'>
                    <h1>Home</h1>
                </button>
            </Link>
        </div>
    );
}