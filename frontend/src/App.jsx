import{
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router';
import Signup from "./components/Signup.jsx";
import PlayerLayout from "./components/player/PlayerLayout.jsx";
import MainLayout from "./components/MainLayout.jsx";
import Login from "./components/Login.jsx";
import CreatorLayout from "./components/creator/CreatorLayout.jsx";
import MainPage from "./components/MainPage.jsx";
import Profile from "./components/Profile.jsx";
import CreateAncestry from "./components/creator/create/CreateAncestry.jsx";
import CreateCommunity from "./components/creator/create/CreateCommunity.jsx";
import CreateArmor from "./components/creator/create/CreateArmor.jsx";
import CreateWeapon from "./components/creator/create/CreateWeapon.jsx";
import CreateClass from "./components/creator/create/CreateClass.jsx";
import CreateSubclass from "./components/creator/create/CreateSubclass.jsx";
import CreateFeature from "./components/creator/create/CreateFeature.jsx";
import CreateDomainCard from "./components/creator/create/CreateDomainCard.jsx";
import CreateCharacter from "./components/player/CreateCharacter.jsx";
import Character from "./components/player/Character.jsx";
import MyAncestries from "./components/creator/my/MyAncestries.jsx";
import MyArmors from "./components/creator/my/MyArmors.jsx";
import MyClasses from "./components/creator/my/MyClasses.jsx";
import MyCommunities from "./components/creator/my/MyCommunities.jsx";
import MyFeatures from "./components/creator/my/MyFeatures.jsx";
import MySubclasses from "./components/creator/my/MySubclasses.jsx";
import MyWeapons from "./components/creator/my/MyWeapons.jsx";
import Ancestry from "./components/objInfoPages/Ancestry.jsx";
import DaggerheartClass from "./components/objInfoPages/DaggerheartClass.jsx";
import Subclass from "./components/objInfoPages/Subclass.jsx";
import Weapon from "./components/objInfoPages/Weapon.jsx";
import Armor from "./components/objInfoPages/Armor.jsx";
import Community from "./components/objInfoPages/Community.jsx";
import Feature from "./components/objInfoPages/Feature.jsx";
import Search from "./components/Search.jsx";
import MyEnemies from "./components/creator/my/MyEnemies.jsx";
import CreateEnemy from "./components/creator/create/CreateEnemy.jsx";
import Enemy from "./components/objInfoPages/Enemy.jsx";
import DomainCard from "./components/objInfoPages/DomainCard.jsx";
import MyDomainCard from "./components/creator/my/MyDomainCard.jsx";
function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="main" element={<MainPage/>}/>
                <Route path="creator" element={<CreatorLayout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path="search" element={<Search/>}/>

                    <Route path="myAncestries" element={<MyAncestries/>} />
                    <Route path="myArmors" element={<MyArmors/>} />
                    <Route path="myClasses" element={<MyClasses/>} />
                    <Route path="myCommunities" element={<MyCommunities/>} />
                    <Route path="myFeatures" element={<MyFeatures/>} />
                    <Route path="mySubclasses" element={<MySubclasses/>} />
                    <Route path="myWeapons" element={<MyWeapons/>} />
                    <Route path="myEnemies" element={<MyEnemies/>} />
                    <Route path="myDomainCards" element={<MyDomainCard/>} />

                    <Route path="createAncestry" element={<CreateAncestry/>}/>
                    <Route path="community" element={<CreateCommunity/>}/>
                    <Route path="createArmory" element={<CreateArmor/>}/>
                    <Route path="createWeapon" element={<CreateWeapon/>}/>
                    <Route path="createClass" element={<CreateClass/>}/>
                    <Route path="createSubclass" element={<CreateSubclass/>}/>
                    <Route path="createFeatureItems" element={<CreateFeature/>}/>
                    <Route path="createEnemy" element={<CreateEnemy/>}/>
                    <Route path="createDomainCard" element={<CreateDomainCard/>}/>

                    <Route path="ancestry/:name" element={<Ancestry/>}/>
                    <Route path="class/:name" element={<DaggerheartClass/>}/>
                    <Route path="subclass/:name" element={<Subclass/>}/>
                    <Route path="weapon/:name" element={<Weapon/>}/>
                    <Route path="armor/:name" element={<Armor/>}/>
                    <Route path="community/:name" element={<Community/>}/>
                    <Route path="feature/:name" element={<Feature/>}/>
                    <Route path="enemy/:name" element={<Enemy/>}/>
                    <Route path="domain_card/:name" element={<DomainCard/>}/>
                </Route>
                <Route path="player" element={<PlayerLayout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="createCharacter" element={<CreateCharacter/>}/>
                    <Route path="character/:name" element={<Character/>}/>
                    <Route path="ancestry/:name" element={<Ancestry/>}/>
                    <Route path="class/:name" element={<DaggerheartClass/>}/>
                    <Route path="subclass/:name" element={<Subclass/>}/>
                    <Route path="weapon/:name" element={<Weapon/>}/>
                    <Route path="armor/:name" element={<Armor/>}/>
                    <Route path="community/:name" element={<Community/>}/>
                    <Route path="feature/:name" element={<Feature/>}/>
                    <Route path="enemy/:name" element={<Enemy/>}/>
                    <Route path="domain_card/:name" element={<DomainCard/>}/>
                </Route>
            </Route>
        )
    )
  return <RouterProvider router={router} />
}

export default App
