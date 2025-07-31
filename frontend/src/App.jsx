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
import CreateAncestry from "./components/creator/CreateAncestry.jsx";
import CreateCommunity from "./components/creator/CreateCommunity.jsx";
import CreateArmor from "./components/creator/CreateArmor.jsx";
import CreateWeapon from "./components/creator/CreateWeapon.jsx";
import CreateClass from "./components/creator/CreateClass.jsx";
import CreateSubclass from "./components/creator/CreateSubclass.jsx";
import CreateFeature from "./components/creator/CreateFeature.jsx";
import CreateCharacter from "./components/player/CreateCharacter.jsx";
import Character from "./components/player/Character.jsx";
import MyAncestries from "./components/creator/MyAncestries.jsx";
import MyArmors from "./components/creator/MyArmors.jsx";
import MyClasses from "./components/creator/MyClasses.jsx";
import MyCommunities from "./components/creator/MyCommunities.jsx";
import MyFeatures from "./components/creator/MyFeatures.jsx";
import MySubclasses from "./components/creator/MySubclasses.jsx";
import MyWeapons from "./components/creator/MyWeapons.jsx";
function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="main" element={<MainPage/>}/>
                <Route path="creator" element={<CreatorLayout/>}>
                    <Route index element={<Profile/>}/>

                    <Route path="myAncestries" element={<MyAncestries/>} />
                    <Route path="myArmors" element={<MyArmors/>} />
                    <Route path="myClasses" element={<MyClasses/>} />
                    <Route path="myCommunities" element={<MyCommunities/>} />
                    <Route path="myFeatures" element={<MyFeatures/>} />
                    <Route path="mySubclasses" element={<MySubclasses/>} />
                    <Route path="myWeapons" element={<MyWeapons/>} />

                    <Route path="createAncestry" element={<CreateAncestry/>}/>
                    <Route path="community" element={<CreateCommunity/>}/>
                    <Route path="createArmory" element={<CreateArmor/>}/>
                    <Route path="createWeapon" element={<CreateWeapon/>}/>
                    <Route path="createClass" element={<CreateClass/>}/>
                    <Route path="createSubclass" element={<CreateSubclass/>}/>
                    <Route path="createFeatureItems" element={<CreateFeature/>}/>
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
