import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import MyList from "./MyList.jsx";

function MyWeapons(){
    return(
        <MyList
            title="My Weapons"
            endpoint="http://localhost:8080/creator/myWeaponsNames"
            itemPath="/creator/weapon"
        />
    );
}
export default MyWeapons;