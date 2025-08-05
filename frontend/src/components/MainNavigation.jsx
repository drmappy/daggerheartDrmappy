import { NavLink } from 'react-router';
function MainNavigation(){
    return(
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" end>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" end>Signup</NavLink>
                    </li>
                    <li>
                        <NavLink to="/main" end>Main Page</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" end>Search</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default MainNavigation;