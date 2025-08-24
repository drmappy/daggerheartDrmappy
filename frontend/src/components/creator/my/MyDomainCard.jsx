import MyList from "./MyList.jsx";
import React from "react";

function MyDomainCard(){
    return(
        <MyList
            title="My Domain Cards"
            endpoint="http://localhost:8080/creator/myDomainCardsNames"
            itemPath="/creator/domain_card"
        />
    );
}
export default MyDomainCard;