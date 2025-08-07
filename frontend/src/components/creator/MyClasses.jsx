import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import MyList from "./MyList.jsx";

function MyClasses(){
    return(
        <MyList
            title="My Classes"
            endpoint="http://localhost:8080/creator/myClassesNames"
            itemPath="/creator/class"
        />
    );
}
export default MyClasses;