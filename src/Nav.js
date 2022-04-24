import { Link } from "react-router-dom";

function Nav(){
    return <nav>
        <Link to = "/">Home</Link>|
        <Link to = "/search">Search</Link>|
        <Link to = "/favorites">Favorites</Link>|
        <Link to = "/drink">New</Link>
    </nav>
}

export default Nav;