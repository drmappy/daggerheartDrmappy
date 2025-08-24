import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import MyList from "./MyList.jsx";

function MyArmors() {
    return(
        <MyList
            title="My Armors"
            endpoint="http://localhost:8080/creator/myArmorsNames"
            itemPath="/creator/armor"
        />
    );
}
export default MyArmors;