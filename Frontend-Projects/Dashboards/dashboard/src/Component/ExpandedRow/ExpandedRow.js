import React from "react";
import { CircleMinus } from "tabler-icons-react";
import { Switch } from "@mantine/core";
import { Divider } from "@mantine/core";
import { CheckboxGroup, Checkbox } from "@mantine/core";
import { RadioGroup, Radio } from "@mantine/core";
import "./ExpandedRow.css";

function ExpandedRow(props) {
  function onClickCircle() {
    props.onClick(-1);
  }

  return (
    <div className="fullrow">
      <Divider my="sm"></Divider>
      <div id="expandedrow">
        <div className="header">
          <div className="header-part-1">
            <div className="minusicon"onClick={onClickCircle}>
              <CircleMinus />
            </div>
            <div>
              <div>{props.role}</div>
              <div>All aspects in the {props.role} module</div>
            </div>
          </div>
          <div className="header-part-2">
            <div>{props.updated}</div>
            <div className="switcher">
              <Switch />
            </div>
          </div>
        </div>
        <div className="groups">
          <div>
            <RadioGroup spacing="lg" orientation="vertical" label="Access Control">
              <Radio value="react" label="All Access" description="This is anonymous"/>
              <Radio value="svelte" label="Restricted Access" />
              
            </RadioGroup>
          </div>
          <div className="vertical-bisector">
            <Divider my="sm" orientation="vertical"></Divider>
          </div>

          <div>
            <CheckboxGroup
              defaultValue={["react"]}
              orientation="vertical"
              label="Permissons"
            >
              <Checkbox value="react" label="View items in access" />
              <Checkbox value="svelte" label="Edit items in access" />
              <Checkbox value="ng" label="Create items in access" />
              <Checkbox value="voue" label="Delete items in access" />
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedRow;
