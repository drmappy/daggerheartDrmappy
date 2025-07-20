import { Outlet } from 'react-router';
import MainNavigation from "./MainNavigation.jsx";
function MainLayout(){
    return (
        <>
            <MainNavigation/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}
export default MainLayout;