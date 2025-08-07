import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import MyList from "./MyList.jsx";

function MyFeatures() {
    return(
        <MyList
            title="My Features"
            endpoint="http://localhost:8080/creator/myFeaturesNames"
            itemPath="/creator/feature"
        />
    );
}
export default MyFeatures;