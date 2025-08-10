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
                    <li>
                        <NavLink
                            to="/creator/createEnemy"
                            end
                        >
                            Create an Enemy
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/creator/myAncestries" end>
                            My Ancestries
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/myArmors" end>
                            My Armors
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/myClasses" end>
                            My Classes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/myCommunities" end>
                            My Communities
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/myFeatures" end>
                            My Features
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/mySubclasses" end>
                            My Subclasses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/myWeapons" end>
                            My Weapons
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/myEnemies" end>
                            My Enemies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/creator/search" end>Search</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default CreatorNavigation