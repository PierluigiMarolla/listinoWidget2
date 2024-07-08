import React, { useEffect, useState } from 'react';
import './App.scss';

import ListinoTab from './components/widgets/listinoTab/ListinoTab';
import ComputoTab from './components/widgets/computoTab/ComputoTab';
import SettingMenu from './components/widgets/settingMenu/SettingMenu';
import Log from './components/widgets/log/Log';


const App = () => {
  const [listinoOpen, setListinoOpen] = useState(true);
  const [computoOpen, setcomputoOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [nomeUtente, setNomeUtente] = useState(null)

  useEffect(() => {

    setNomeUtente(`utente-${Math.floor(Math.random() * 100)}`)
  }, [])
  



  function closeListino(newValue) {
    setListinoOpen(newValue)
  }

  function openListino(newValue) {
    setListinoOpen(newValue)
  }

  function closeComputo(newValue) {
    setcomputoOpen(newValue)
  }

  function openComputo(newValue) {
    setcomputoOpen(newValue)
  }

  function openSetting(newValue) {
    setSettingOpen(newValue)
  }

  function openLog(newValue) {
    setLogOpen(newValue)
  }

  return (
    <>
      <div className='container-grid'>
        <div className={`ancor ${listinoOpen ? "" : "closed"}`}>
          <ListinoTab nomeUtente={nomeUtente} close={closeListino} open={openComputo} openSet={openSetting} setValue={settingOpen} openLog={openLog} logValue={logOpen} ></ListinoTab>
        </div>
  
        <div className={`ancor ${computoOpen ? "" : "closed"}`}>
          <ComputoTab close={closeComputo} open={openListino} openSet={openSetting} setValue={settingOpen}></ComputoTab>
        </div>

        <div className={`ancor-set ${settingOpen ? "" : "closed"}`}>
          <SettingMenu></SettingMenu>
        </div>

        <div className={`ancor ${logOpen ? "" : "closed"}`}>
          <Log openLog={openLog}></Log>
        </div>
      </div>
    </>
  );
}

export default App;
