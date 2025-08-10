import { NavLink } from 'react-router';

function PlayerNavigation(){
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/player/createCharacter"
                            end
                        >
                            Create Character
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/player"
                            end
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/player/search" end>
                            Search
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default PlayerNavigation;