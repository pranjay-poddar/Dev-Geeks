import React from "react";
import data from "../../Constants/constants2";

import Initialunexpanded from "../initialunexpandedrow/initialunexpanded";
const renderrow=(element,ind)=>{

    console.log("hvk");
    return (
    <Initialunexpanded
     keys={ind}
    element={element}
    >
</Initialunexpanded>
    );
};

const Initial=()=>{

    const rows=data.map((element,ind)=>renderrow(element,ind));
    console.log(data);
    return (
        <div>
        <Initialunexpanded
            type="header"
            element={{
                role:"Department/role",
                access:"Acces Level",
                num:" No. of members",
                updated:"Last updated"
            }}
            >
        </Initialunexpanded>
        
        
       {rows}
        </div>
        );
    }

    export default Initial;

