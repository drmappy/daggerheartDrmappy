import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import MyList from "./MyList.jsx";

function MySubclasses() {
    return(
        <MyList
            title="My Subclasses"
            endpoint="http://localhost:8080/creator/mySubClassesNames"
            itemPath="/creator/subclass"
        />
    );
}
export default MySubclasses;