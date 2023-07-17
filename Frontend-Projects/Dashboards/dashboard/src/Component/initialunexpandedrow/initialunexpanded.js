import React from "react";
import { Divider,Chip,Switch } from '@mantine/core';
import PlusIcon from "../../Static/svg/plusicon.svg";
import { useDispatch,useSelector } from "react-redux";
import { tableaction } from "../../store/table-slice";

import './initialunexpanded.css'
const Initialunexpanded=(props)=>{
    
    const dispatch=useDispatch();
    const onroleclick=()=>{
        dispatch(tableaction.toggle());

    };


return (
    <div id="unexpandedrowcomponent2" onClick={onroleclick}>
        <Divider my="sm"></Divider>
        {/* <div className="unexpandedrow">
            {props.type ?(
              <div className="header-space1"></div>
            ):(
              <img onClick={onroleclick} src={PlusIcon}></img>   
            // <div></div>
            )}
        </div> */}

        <div className="row-content">
            <div className="access">{props.element.role}</div>
              
            {props.type ? (
            <div className="MAX">{props.element.access}</div>
          ) : (
            <div className="MAX">
              <Chip
                value="chip"
                checked={false}
                styles={{
                  label: { color: props.chipColor },
                  outline: { color: props.chipColor },
                  filled: { color: props.chipColor },
                  input: { color: props.chipColor },
                  disabled: { color: props.chipColor },
                }}
              >
                {props.element.access}
              </Chip>
            </div>
          )}
             <div className="MAX">{props.element.num}</div>
          <div className="MAX">{props.element.updated}</div>

          {props.type ? (
          <></>
        ) : (
          <div className="switch">
            <Switch />
          </div>
        )}
        </div>

    </div>
    
);
};

export default Initialunexpanded; 