import MyList from "./MyList.jsx";

function MyAncestries() {
    return(
        <MyList
            title="My Ancestries"
            endpoint="http://localhost:8080/creator/myAncestriesNames"
            itemPath="/creator/ancestry"
        />
    );
}
export default MyAncestries;