import React from "react";
import { Switch } from "@mantine/core";
import { Divider } from "@mantine/core";
import { Chip } from "@mantine/core";

import PlusIcon from "../../Static/svg/plusicon.svg";

import "./UnexpandedRow.css";

const UnexpandedRow = (props) => {
  function onPlusClick(id) {
    console.log("in bas comp");
    console.log(props.keys);
    console.log(id);
    console.log(props.element.role);
    props.onClick(id);
  }

  return (
    <div id="unexpandedrowcomponent">
      <Divider my="sm" />

      <div className="unexpandedrow">
        {props.type ? (
          <div className="header-space"></div>
        ) : (
          <img onClick={() => onPlusClick(props.keys)} src={PlusIcon}></img>
        )}

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

          <div className="MAX">{props.element.summary}</div>
          <div className="MAX">{props.element.updated}</div>
        </div>
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

export default UnexpandedRow;
