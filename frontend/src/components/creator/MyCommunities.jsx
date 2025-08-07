import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import MyList from "./MyList.jsx";

function MyCommunities() {return(
    <MyList
        title="My Communities"
        endpoint="http://localhost:8080/creator/myCommunitiesNames"
        itemPath="/creator/community"
    />
);
}
export default MyCommunities;