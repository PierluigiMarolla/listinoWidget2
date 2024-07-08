import React from 'react';
import './../listinoTab/listinoTab.css'
import '@progress/kendo-theme-default/dist/all.css';
import './../../../App.scss';
import AutoCompleteSelect from './../autoCompleteSelect/AutoCompleteSelect'
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
  getSelectedState,
} from '@progress/kendo-react-grid';
import { process } from "@progress/kendo-data-query";
/* import { GridPDFExport } from "@progress/kendo-react-pdf"; */
import { Input } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import { getter } from '@progress/kendo-react-common';
import { ContextMenu, MenuItem } from "@progress/kendo-react-layout";
import { mapTree } from '@progress/kendo-react-treelist';
import computo from './../../../json/listino_abruzzo.json'
import PropTypes from "prop-types"


const ListinoTab = ({ nomeUtente, close, open, openSet, setValue, openLog, logValue }) => {


  const [usaAnalisi, setUsaAnalisi] = React.useState(false)
  const [toLog, setToLog] = React.useState(null)

  const addLogAnalisi = (value) => {
    setToLog(value)
  }

  let percorso = computo.PweElencoPrezzi.EPItem;



  const DATA_ITEM_KEY = 'Tariffa';
  const SELECTED_FIELD = 'selected';
  const idGetter = getter(DATA_ITEM_KEY);
  const initialDataState = {
    skip: 0,
    take: 100,
    sort: [
      {
        field: 'Tariffa',
        dir: 'desc',
      },
    ],
    group: [
      {
        field: "IDSupCap.DesSintetica"
      }
    ]
  };
  const [tabPropOpen, setTabPropOpen] = React.useState(true)
  const [tabAnalisiOpen, setTabAnalisiOpen] = React.useState(false)

  function openProp() {
    setTabAnalisiOpen(false)
    setTabPropOpen(true)
  }

  function openAnalisi() {
    setTabPropOpen(false)
    setTabAnalisiOpen(true)
  }

  const updateDataItem = (updatedItem) => {
    const updatedData = data.map(item =>
      item.Tariffa === updatedItem.Tariffa ? updatedItem : item
    );
    setData(updatedData);

    // Aggiorna anche l'array principale percorso
    percorso = percorso.map(item =>
      item.Tariffa === updatedItem.Tariffa ? updatedItem : item
    );
  };



  const DetailComponent = (props) => {

    let p1 = 0;
    const dataItem = props.dataItem;
    const p1Originale = dataItem.Prezzo1

    const [sicurezza, setSicurezza] = React.useState(dataItem.IncSIC)
    const [manodopera, setManodopera] = React.useState(dataItem.IncMDO)
    const [attrezzature, setAttrezzature] = React.useState(dataItem.IncATTR)
    const [materiali, setMateriali] = React.useState(dataItem.IncMAT)


    const handleSicurezzaChange = (event) => {
      const updatedSicurezza = event.target.value;
      setSicurezza(updatedSicurezza);
      updateDataItem({ ...dataItem, IncSIC: updatedSicurezza });

      const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setToLog({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stato modificato Incidenza Sicurezza`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
    };

    const handleManodoperaChange = (event) => {
      const updatedManodopera = event.target.value;
      setManodopera(updatedManodopera);
      updateDataItem({ ...dataItem, IncMDO: updatedManodopera });

      const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setToLog({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stato modificato Incidenza Manodopera`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
    };

    const handleAttrezzatureChange = (event) => {
      const updatedAttrezzature = event.target.value;
      setAttrezzature(updatedAttrezzature);
      updateDataItem({ ...dataItem, IncATTR: updatedAttrezzature });

      const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setToLog({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stato modificato Incidenza Attrezzature`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
    };

    const handleMaterialiChange = (event) => {
      const updatedMateriali = event.target.value;
      setMateriali(updatedMateriali);
      updateDataItem({ ...dataItem, IncMAT: updatedMateriali });

      const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setToLog({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stato modificato Incidenza Materiali`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
    };

    const p1Changer = (newValue) => {
      p1 = newValue
      setUsaAnalisi(true);
      updateDataItem({ ...dataItem, Prezzo1: newValue });
    }

    const p1Restore = () => {
      setUsaAnalisi(false)
    }

    const stateChanger = () => {
      setUsaAnalisi(true)
    }

    const updateLavorazioni = (newLavorazioni) => {
      const updatedItem = { ...dataItem, analisi: newLavorazioni };
      updateDataItem(updatedItem);  // Aggiorna l'array principale chiamando updateDataItem
    };

    return (
      <>
        <section className={tabPropOpen ? "tabOpen" : "tabClosed"}>
          <div>
            <button>Proprietà</button>
            <button onClick={openAnalisi}>Analisi</button>
          </div>
          <p>
            <strong>Tariffa:</strong> {dataItem.Tariffa}
          </p>
          <p>
            <strong>Articolo:</strong> {dataItem.Articolo}
          </p>
          <p>
            <strong>DesRidotta:</strong> {dataItem.DesRidotta}
          </p>
          <p>
            <strong>DesEstesa:</strong> {dataItem.DesEstesa}
          </p>
          <p>
            <strong>UnMisura:</strong> {dataItem.UnMisura}
          </p>
          <p>
            <strong>Data:</strong> {dataItem.Data}
          </p>
          <p>
            <strong>Prezzo1:</strong> {!usaAnalisi ? p1Originale : p1}
          </p>
          <p>
            <strong>Prezzo2:</strong> {dataItem.Prezzo2}
          </p>
          <p>
            <strong>Prezzo3:</strong> {dataItem.Prezzo3}
          </p>
          <p>
            <strong>Prezzo4:</strong> {dataItem.Prezzo4}
          </p>
          <p>
            <strong>Prezzo5:</strong> {dataItem.Prezzo5}
          </p>
          <div>
            <label htmlFor='sic'>
              <strong>Incidenza Sicurezza:</strong>
            </label>
            <input
              type="number"
              id="sic"
              value={sicurezza}
              onChange={handleSicurezzaChange}
            />
          </div>
          <div>
            <label htmlFor='man'>
              <strong htmlFor='man'>Incidenza Manodopera:</strong>
            </label>
            <input
              type="number"
              id="man"
              value={manodopera}
              onChange={handleManodoperaChange}
            />
          </div>
          <div>
            <label htmlFor='mat'>
              <strong>Incidenza Materiali:</strong>
            </label>
            <input
              type="number"
              id="mat"
              value={materiali}
              onChange={handleMaterialiChange}
            />
          </div>
          <div>
            <label htmlFor='attr'>
              <strong>Incidenza Attrezzature:</strong>
            </label>
            <input
              type="number"
              id="attr"
              value={attrezzature}
              onChange={handleAttrezzatureChange}
            />
          </div>
          <div className="input-container">
            <button onClick={p1Restore}>Usa Listino</button>
            <button onClick={stateChanger}>Usa Analisi</button>
          </div>
        </section>
        <section className={tabAnalisiOpen ? "tabOpen" : "tabClosed"}>
          <div>
            <button onClick={openProp}>Proprietà</button>
            <button>Analisi</button>
          </div>
          <AutoCompleteSelect selectedRow={selectedRow} nomeUtente={nomeUtente} addLogAnalisi={addLogAnalisi} p1Changer={p1Changer} updateDetailComponent={updateLavorazioni} detProps={dataItem} />
        </section>
      </>
    );
  };

  const initialSort = [
    {
      field: "Tariffa",
      dir: "asc",
    },
  ];





  const [data, setData] = React.useState(
    percorso.map((dataItem) =>
      Object.assign(
        {
          selected: false,
        },
        dataItem
      )
    )
  );
  const [editID, setEditID] = React.useState(null);
  const [dataState, setDataState] = React.useState(initialDataState);

  const [selectedState, setSelectedState] = React.useState({});
  const [dataItemIndex, setDataItemIndex] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState();
  const offset = React.useRef({
    left: 0,
    top: 0,
  });
  const gridData = percorso;
  const [sort, setSort] = React.useState(initialSort);
  const [collapsedGroups, setCollapsedGroups] = React.useState([]);

  const onSelectionChange = (event) => {
    let targetEl = event.nativeEvent.target;
    let isDetail = false;
    while (targetEl.tagName !== 'BODY') {
      if (targetEl.tagName === 'TR') {
        if (targetEl.className.indexOf('k-detail-row') >= 0) {
          isDetail = true;
          break;
        }
      }
      targetEl = targetEl.parentNode;
    }
    if (!isDetail) {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: DATA_ITEM_KEY,
      });
      setSelectedState(newSelectedState);
      setSelectedState(newSelectedState);
      let newData = data.map((item) => ({
        ...item,
        [SELECTED_FIELD]: newSelectedState[idGetter(item)],
      }));
      setData(newData);
    };


  };

  const handleGroupState = (props) => {
    return {
      data: mapTree(props.data, 'items', (group) => {
        if (!group.aggregates) return group;
        let groupId = group.field + '_' + group.value;
        return { ...group, expanded: !collapsedGroups.includes(groupId) };
      }),
      total: props.total,
    };
  };

  const handleGroupChange = (event) => {
    const groupField = event.target.value;
    if (groupField === "none") {
      setDataState({ ...dataState, group: [] });
    } else {
      setDataState({ ...dataState, group: [{ field: groupField }] });
    }
  };

  const handleContextMenuOpen = (e, dataItem) => {
    e.preventDefault();
    setDataItemIndex(
      data.findIndex((p) => p.Tariffa === dataItem.Tariffa)
    );
    setSelectedRow(dataItem);
    offset.current = {
      left: e.pageX,
      top: e.pageY,
    };
    setShow(true);
  };

  const handleCloseMenu = () => {
    setShow(false);
  };

  const handleDeleteRow = () => {
    let data = [...gridData];
    data.splice(dataItemIndex, 1);
    setData(data);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }) + ' - ' + now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setToLog({
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stata eliminata`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleAddRow = () => {
    const newRow = {
      Tariffa: data.length + 1,
    };
    setData([newRow, ...data]);
    setEditID(newRow.Tariffa);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }) + ' - ' + now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setToLog({
      Tariffa: `${data.length + 1}`,
      Modifica: `è stata aggiunta una riga`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleEditRow = () => {
    setEditID(selectedRow.Tariffa);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }) + ' - ' + now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setToLog({
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stato editato`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };



  const handleMoveUp = () => {
    let data = [...gridData];
    if (dataItemIndex !== 0) {
      data.splice(dataItemIndex, 1);
      data.splice(dataItemIndex - 1, 0, selectedRow);
      setData(data);
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }) + ' - ' + now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setToLog({
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stato mandato su di una riga`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleMoveDown = () => {
    let data = [...gridData];
    if (dataItemIndex < data.length) {
      data.splice(dataItemIndex, 1);
      data.splice(dataItemIndex + 1, 0, selectedRow);
      setData(data);
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }) + ' - ' + now.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    setToLog({
      Tariffa: selectedRow.Tariffa,
      Modifica: `${selectedRow.Tariffa} è stato mandato giù di una riga`,
      Utente: nomeUtente,
      Orario: formattedDate
    })
  };

  const handleOnSelect = (e) => {
    switch (e.item.data.action) {
      case "addRow":
        handleAddRow();
        break;
      case "editRow":
        handleEditRow();
        break;
      case "deleteRow":
        handleDeleteRow();
        break;
      case "moveUp":
        handleMoveUp();
        break;
      case "moveDown":
        handleMoveDown();
        break;
      default:
    }
    setShow(false);
  };

  const handleContextMenu = (event) => {
    handleContextMenuOpen(event.syntheticEvent, event.dataItem);
  };

  const itemChange = (event) => {
    const inEditID = event.dataItem.Tariffa;
    const field = event.field || "";
    const newData = data.map((item) =>
      item.Tariffa === inEditID
        ? {
          ...item,
          [field]: event.value,
        }
        : item
    );
    setData(newData);
  };

  const closeEdit = () => {
    setEditID(null)
  };

  const filterData = (e) => {
    let value = e.target.value;


    let filter = {
      logic: "or",
      filters: [
        { field: "Tariffa", operator: "contains", value: value },
        { field: "DesRidotta", operator: "contains", value: value },
        { field: "DesEstesa", operator: "contains", value: value },
        { field: "UnMisura", operator: "contains", value: value },
        { field: "Prezzo1", operator: "contains", value: value },
      ],
    };


    const filteredData = filterBy(percorso, filter);


    setData(filteredData);
  };

  const expandChange = (event) => {
    setSelectedRow(event.dataItem);
    if (!event.dataItem.aggregates) {
      let newData = data.map((item) => {
        if (item[DATA_ITEM_KEY] === event.dataItem[DATA_ITEM_KEY]) {
          item.expanded = !event.dataItem.expanded;
        }
        return item;
      });
      setData(newData);
    } else {
      let groupId = event.dataItem.field + '_' + event.dataItem.value;
      if (!collapsedGroups.includes(groupId)) {
        setCollapsedGroups([...collapsedGroups, groupId]);
      } else {
        setCollapsedGroups(collapsedGroups.filter((gr) => gr !== groupId));
      }
    }
  };

  /* let gridPDFExport;
  const exportPDF = () => {
    if (gridPDFExport !== null) {
      gridPDFExport.save();
    }
  }; */

  const dataStateChange = (event) => {
    setDataState(event.dataState);
  };

  const onRowDoubleClick = (event) => {
    if (!event.dataItem.aggregates) {
      let newData = data.map((item) => {
        if (item[DATA_ITEM_KEY] === event.dataItem[DATA_ITEM_KEY]) {
          item.expanded = !event.dataItem.expanded;
        }

        return item;
      });
      setData(newData);
    }
  };

  const grid2 = (
    <>
      <Grid
        filterable={false}
        groupable={false}
        reorderable={true}
        style={{
          height: "800px",
        }}
        resizable={true}
        data={handleGroupState(process(data.map((item) => ({
          ...item,
          inEdit: item.Tariffa === editID,
          [SELECTED_FIELD]: selectedState[idGetter(item)],
        })), dataState), sort)
        }
        {...dataState}
        onRowDoubleClick={onRowDoubleClick}
        detail={DetailComponent}
        expandField="expanded"
        onExpandChange={expandChange}
        pageable={{
          buttonCount: 4,
          pageSizes: true,
        }}
        dataItemKey={DATA_ITEM_KEY}
        selectedField={SELECTED_FIELD}
        selectable={true}
        navigatable={true}
        onSelectionChange={onSelectionChange}
        editField="inEdit"
        onItemChange={itemChange}
        onDataStateChange={dataStateChange}
        onContextMenu={handleContextMenu}
        sortable={true}
        sort={sort}
        onSortChange={(e) => {
          setSort(e.sort);
        }}
      >
        <Column field="Tariffa" title="Tariffa" editable={false} width="150wpx" minResizableWidth={110} />
        <Column field="DesRidotta" title="Descrizione" width="1000px" minResizableWidth={600} />
        <Column field="UnMisura" title="Unità Misura" width="200px" minResizableWidth={50} />
        <Column field="Prezzo1" title="Prezzo" width="200px" minResizableWidth={80} />
        <GridToolbar>
          <div onClick={closeEdit}>
            <button
              title="Add new"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary margin"
              onClick={handleAddRow}
            >
              Add new
            </button>
            <button
              title='Close Edit'
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary margin'
              onClick={closeEdit}>
              Close Edit
            </button>
            {/* <button
              title="Export PDF"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary margin"
              onClick={exportPDF}
            >
              Export PDF
            </button> */}
          </div>
          <div>
            <p>Search:</p>
            <Input onChange={filterData} />
          </div>
          <div>
            <p>Grouping:</p>
            <select onChange={handleGroupChange} defaultValue="IDSupCap.DesSintetica">
              <option value="none">Standard</option>
              <option value="IDSupCap.DesSintetica">Super Capitoli</option>
              <option value="IDCap.DesSintetica">Capitoli</option>
              <option value="IDSbCap.DesSintetica">SubCapitoli</option>
            </select>
          </div>
        </GridToolbar>
      </Grid>
      <ContextMenu
        show={show}
        offset={offset.current}
        onSelect={handleOnSelect}
        onClose={handleCloseMenu}
      >
        <MenuItem
          text="Add row"
          data={{
            action: "addRow",
          }}
          icon="plus"
        />
        <MenuItem
          text="Edit row"
          data={{
            action: "editRow",
          }}
          icon="edit"
        />
        <MenuItem
          text="Delete row"
          data={{
            action: "deleteRow",
          }}
          icon="delete"
        />
        <MenuItem
          text="Move row up"
          data={{
            action: "moveUp",
          }}
          icon="arrow-up"
        />
        <MenuItem
          text="Move row down"
          data={{
            action: "moveDown",
          }}
          icon="arrow-down"
        />
      </ContextMenu>
    </>

  );

  /* function handleClick() {
    close(false)
    open(true)
    setEditID(null)
  } */

  /* function handleClickSet() {
    setValue === false ? openSet(true) : openSet(false);
  } */

  function handleClickLog() {
    openLog(true)
  }

  React.useEffect(() => {
    async function updateJSONData(newData) {
      try {
        const response = await fetch('/.netlify/functions/update-json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });
    
        if (!response.ok) {
          throw new Error('Errore durante l\'aggiornamento del file JSON');
        }
    
        const result = await response.json();
        console.log('Risposta dal server:', result);
        return result;
      } catch (error) {
        console.error('Errore:', error);
        throw error;
      }
    }

    if(toLog !== null) {
      updateJSONData(toLog)
    }
    
  }, [toLog])
  

  return (
    <div className='chiodo'>
      <div className='flex'>
        <div>
          <button
            title='Listino'
            className='k-button k-button-md k-button-solid k-button-solid-primary'>
            Listino
          </button>
          {/* <button
            title='Computo'
            className='k-button k-button-md k-button-solid k-button-solid-secondary'
            onClick={handleClick}>
            Computo
          </button> */}
        </div>
        {/* <button
          title='IMPOSTAZIONI'
          onClick={handleClickSet}
        >IMPOSTAZIONI</button> */}
        <button
          title='Log'
          onClick={handleClickLog}
        >LOG</button>
      </div>
      {grid2}
      {/* <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
        {grid2}
      </GridPDFExport> */}
    </div>
  )
}

ListinoTab.propTypes = {
  close: PropTypes.func,
  open: PropTypes.func,
  openSet: PropTypes.func,
  openLog: PropTypes.func,
  setValue: PropTypes.bool,
  logValue: PropTypes.bool,
  nomeUtente: PropTypes.string,
};

ListinoTab.defaultProps = {
  close: () => { },
  open: () => { },
  openSet: () => { },
  openLog: () => { },

  setValue: false,
  logValue: false,

  nomeUtente: "",
};



export default ListinoTab
