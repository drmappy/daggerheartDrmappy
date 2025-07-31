import PlayerNavigation from "./PlayerNavigation.jsx";
import { Outlet } from 'react-router';

function PlayerLayout(){
    return(
      <>
          <PlayerNavigation/>
          <main>
              <Outlet/>
          </main>
      </>
    );
}
export default PlayerLayout;