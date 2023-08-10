import React, { useState } from 'react'
import "./Style.css"
import Menu from "./MenuApi.js"
import MenuCard from './MenuCard';
import Navbar from './Navbar';


const uniqueList = [
  ...new Set(
    Menu.map((curElem) => {
      return curElem.category;
    })
  ),
  "All",
];

const Resturant = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [menuList, setMenuList] = useState(uniqueList);

  const filterItem = (category) => {
    if(category==="All"){
      setMenuData(Menu)
      return;
    }
    const updatedList = Menu.filter((curElem) => {
      return curElem.category === category
    });
    setMenuData(updatedList);
  }
  return (
    <>

      <Navbar  filterItem={filterItem} menuList ={menuList}/>
      <MenuCard menuData={menuData} />
    </>
  )
}
export default Resturant;

