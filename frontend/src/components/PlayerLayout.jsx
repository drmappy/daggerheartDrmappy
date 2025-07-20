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