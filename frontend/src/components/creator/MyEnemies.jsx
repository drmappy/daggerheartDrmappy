import MyList from "./MyList.jsx";

function MyEnemies(){
    return(
        <MyList
            title="My Enemies"
            endpoint="http://localhost:8080/creator/myEnemiesNames"
            itemPath="/creator/enemy"
        />
    );
}
export default MyEnemies;