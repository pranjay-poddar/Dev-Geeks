import React from "react";
import { Table } from "@mantine/core";
import { useState } from "react";
import { CirclePlus } from "tabler-icons-react";

import { Switch } from "@mantine/core";
import elements from "../../Constants/constants";
import ExpandedRow from "../ExpandedRow/ExpandedRow.js";
import UnexpandedRow from "../UnexpandedRow/UnexpandedRow";
import "./Table.css";

function TableComponent() {
  const [flag, setFlag] = useState(-1);

  function onPlusClick(event) {
    setFlag(event);
  }
  function onMinusClick(event) {
    setFlag(event);
  }

  function renderRow(element, ind) {
    if (flag == ind) {
      return (
        <ExpandedRow
          role={element.role}
          updated={element.updated}
          onClick={onMinusClick}
        ></ExpandedRow>
      );
    } else {
      return (
        <UnexpandedRow
          onClick={onPlusClick}
          keys={ind}
          element={element}
          chipColor={element.chipcolor}
        ></UnexpandedRow>
      );
    }
  }
  const rows = elements.map((element, ind) => renderRow(element, ind));

  return (
    <div>
  
      <UnexpandedRow
       type="header"
        element={{
          role: "Deparment/Role Name",
          access: "Access Level",
          summary: "Summary",
          updated: "Last Updated",
        }}
      ></UnexpandedRow>

      {rows}
    </div>
  );
}

export default TableComponent;
