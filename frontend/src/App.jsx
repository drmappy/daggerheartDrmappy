import{
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router';
import Signup from "./components/Signup.jsx";
import PlayerLayout from "./components/PlayerLayout.jsx";
import MainLayout from "./components/MainLayout.jsx";
import Login from "./components/Login.jsx";
import CreatorLayout from "./components/CreatorLayout.jsx";
import MainPage from "./components/MainPage.jsx";
import Profile from "./components/Profile.jsx";
import CreateAncestry from "./components/CreateAncestry.jsx";
import CreateCommunity from "./components/CreateCommunity.jsx";
import CreateArmor from "./components/CreateArmor.jsx";
import CreateWeapon from "./components/CreateWeapon.jsx";
import CreateClass from "./components/CreateClass.jsx";
import CreateSubclass from "./components/CreateSubclass.jsx";
import CreateWeaponOrArmorFeature from "./components/CreateWeaponOrArmorFeature.jsx";
import CreateCharacter from "./components/CreateCharacter.jsx";
import Character from "./components/Character.jsx";
function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="main" element={<MainPage/>}/>
                <Route path="creator" element={<CreatorLayout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path="createAncestry" element={<CreateAncestry/>}/>
                    <Route path="community" element={<CreateCommunity/>}/>
                    <Route path="createArmory" element={<CreateArmor/>}/>
                    <Route path="createWeapon" element={<CreateWeapon/>}/>
                    <Route path="createClass" element={<CreateClass/>}/>
                    <Route path="createSubclass" element={<CreateSubclass/>}/>
                    <Route path="createFeatureItems" element={<CreateWeaponOrArmorFeature/>}/>
                </Route>
                <Route path="player" element={<PlayerLayout/>}>
                    <Route index element={<Profile/>}/>
                    <Route path="createCharacter" element={<CreateCharacter/>}/>
                    <Route path="character" element={<Character/>}/>
                </Route>
            </Route>
        )
    )
  return <RouterProvider router={router} />
}

export default App
