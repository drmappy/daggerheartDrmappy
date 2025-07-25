import { NavLink } from 'react-router';

function CreatorNavigation(){
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/creator"
                            end
                        >
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creator/createAncestry"
                            end
                        >
                            Create an Ancestry
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creator/community"
                            end
                        >
                            Create a Community
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creator/createArmory"
                            end
                        >
                            Create an Armor
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creator/createWeapon"
                            end
                        >
                            Create a Weapon
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creator/createClass"
                            end
                        >
                            Create a Class
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creator/createSubclass"
                            end
                        >
                            Create a Subclass
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creator/createFeatureItems"
                            end
                        >
                            Create a Feature
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default CreatorNavigation