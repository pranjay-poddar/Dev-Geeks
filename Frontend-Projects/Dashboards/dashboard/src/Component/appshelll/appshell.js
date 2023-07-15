import React,{useState} from "react";
// import {AppShell,Navbar,Header} from '@mantine/core'
import './appshell.css'
import { useSelector,useDispatch } from "react-redux";
import Detail from "../logindetails/details";
import Initial from "../Table/initialtable";
import RenderRow from "../RenderRow";
import Addbutton from "../leftsidebutton/button";
import { Button } from "@mantine/core";

import { tableaction } from "../../store/table-slice";
import {
    AppShell,
    Navbar,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
  } from '@mantine/core';


  
  const Shell=()=>{

    const dispatch=useDispatch();
    const onbackclick=()=>{
        dispatch(tableaction.toggle());

    };

    const showtable= useSelector(state=>state.table.tablevisible);

    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
   
       <AppShell
       styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
    //   fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
     
          {/* <Text>Application navbar</Text> */}
          <Addbutton name="Project"></Addbutton>
          <Addbutton name="Classroom"></Addbutton>
          <Addbutton name="Classroom"></Addbutton>




        </Navbar>
      }
 
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <span className="logo"></span>
            <div className="appshellheader">
              <div className="classmanager"> Classroom Manager</div>
              <Detail></Detail>
              </div>
          </div>
        </Header>
        
      }
       >

{!showtable && <div className="tabledes"><RenderRow></RenderRow></div>}
{showtable &&<div className='renderer'><Initial></Initial></div>}
{!showtable && <div className="btn"> <Button onClick={onbackclick} variant="gradient" gradient={{ from: 'red', to: 'purple' }}>back</Button></div>}

       </AppShell>
  
    );
}

export default Shell;