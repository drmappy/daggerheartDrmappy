import CreatorNavigation from "./CreatorNavigation.jsx";
import { Outlet } from 'react-router';

function CreatorLayout(){
    return (
        <>
            <CreatorNavigation/>
            <main>
                <Outlet/>
            </main>
        </>
    );
}
export default CreatorLayout;