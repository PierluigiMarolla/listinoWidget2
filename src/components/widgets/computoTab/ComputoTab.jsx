import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './../../../App.scss';
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { Input } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";
import computo from './../../../json/xmltojso.json'
import PropTypes from "prop-types"

const initialDataState = {
  skip: 0,
  take: 100,
};


const DetailComponent = (props) => {
  const dataItem = props.dataItem;
  return (
    <section>
      <p>
        <strong>Tipo EP:</strong> {dataItem.TipoEP} units
      </p>
      <p>
        <strong>Tariffa:</strong> {dataItem.Tariffa} units
      </p>
      <p>
        <strong>Articolo:</strong> {dataItem.Articolo} units
      </p>
      <p>
        <strong>DesRidotta:</strong> {dataItem.DesRidotta}
      </p>
      <p>
        <strong>DesEstesa:</strong> {dataItem.DesEstesa}
      </p>
      <p>
        <strong>DesBreve:</strong> {dataItem.DesBreve}
      </p>
      <p>
        <strong>UnMisura:</strong> {dataItem.UnMisura}
      </p>
      <p>
        <strong>Prezzo1:</strong> {dataItem.Prezzo1}
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
      <p>
        <strong>IDSpCap:</strong> {dataItem.IDSpCap}
      </p>
      <p>
        <strong>IDCap:</strong> {dataItem.IDCap}
      </p>
      <p>
        <strong>IDSbCap:</strong> {dataItem.IDSbCap}
      </p>
      <p>
        <strong>CodiceWBSCAP:</strong> {dataItem.CodiceWBSCAP}
      </p>
      <p>
        <strong>Flags:</strong> {dataItem.Flags}
      </p>
      <p>
        <strong>Data:</strong> {dataItem.Data}
      </p>
      <p>
        <strong>AdrInternet:</strong> {dataItem.AdrInternet}
      </p>
      <p>
        <strong>IncSIC:</strong> {dataItem.IncSIC}
      </p>
      <p>
        <strong>IncMDO:</strong> {dataItem.IncMDO}
      </p>
      <p>
        <strong>IncMAT:</strong> {dataItem.IncMAT}
      </p>
      <p>
        <strong>IncATTR:</strong> {dataItem.IncATTR}
      </p>
      <p>
        <strong>TagBIM:</strong> {dataItem.TagBIM}
      </p>
      <p>
        <strong>PweEPAnalisi:</strong> {dataItem.PweEPAnalisi}
      </p>
    </section>
  );
};


const ComputoTab = ({ close, open }) => {

  let percorso = computo[0].PweDocumento.PweMisurazioni.PweElencoPrezzi.EPItem;


  const [data, setData] = React.useState(percorso);
  const [editID, setEditID] = React.useState(null);

  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(
    process(data, dataState)
  );

 console.log(dataResult)

  const [page, setPage] = React.useState(initialDataState);
  const [pageSizeValue, setPageSizeValue] = React.useState();
  const pageChange = (event) => {
    const targetEvent = event.targetEvent;
    const take =
      targetEvent.value === "All" ? data.length : event.page.take;
    if (targetEvent.value) {
      setPageSizeValue(targetEvent.value);
    }
    setPage({
      ...event.page,
      take,
    });
  };

  const rowClick = (event) => {
    setEditID(event.dataItem.Tariffa);
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

  /* document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'p') {
        
        console.log('Ctrl + P premuto');
       
    }
}); */

  const addRecord = () => {
    const newRecord = {
      Tariffa: data.length + 1,
    };
    setData([newRecord, ...data]);
    setEditID(newRecord.Tariffa);
  };

  const filterData = (e) => {
    let value = e.target.value;
    let filter = {
      logic: "or",
      filters: [
        {
          field: "Tariffa",
          operator: "contains",
          value: value,
        },
        {
          field: "DesEstesa",
          operator: "contains",
          value: value,
        },
        {
          field: "UnMisura",
          operator: "contains",
          value: value,
        },
        {
          field: "Prezzo1",
          operator: "contains",
          value: value,
        },
        {
          field: "IDSpCap",
          operator: "contains",
          value: value,
        },
      ],
    };
    setData(filterBy(percorso, filter));


  };


  const expandChange = (event) => {
    let newData = data.map((item) => {
      if (item.Tariffa === event.dataItem.Tariffa) {
        item.expanded = !event.dataItem.expanded;
      }
      return item;
    });
    setData(newData);
  };

  let gridPDFExport;
  const exportPDF = () => {
    if (gridPDFExport !== null) {
      gridPDFExport.save();
    }
  };

  const margin = {
    "margin-left": "20px",
    "margin-right": "20px"
  }

  const grid = (
    <Grid
      sortable={false}
      filterable={false}
      groupable={false}
      style={{
        height: "800px",
      }}

      data={data.map((item) => ({
        ...item,
        inEdit: item.Tariffa === editID,
      }))
        .slice(page.skip, page.take + page.skip)
      }
      detail={DetailComponent}
      expandField="expanded"
      onExpandChange={expandChange}
      skip={page.skip}
      take={page.take}
      total={data.length}
      pageable={{
        buttonCount: 6,
        pageSizes: [5, 10, 15, "All"],
        pageSizeValue: pageSizeValue,
      }}
      onPageChange={pageChange}
      editField="inEdit"
      onRowClick={rowClick}
      onItemChange={itemChange}
      {...dataState}
      onDataStateChange={(e) => {
        setDataState(e.dataState);
        setDataResult(process(data, e.dataState));
      }}

    >

      <Column field="Tariffa" title="Tariffa" editable={false} width="100px" />
      <Column field="DesEstesa" title="Descrizione dei lavori" width="600px" />
      <Column field="UnMisura" title="Dimensioni" width="200px" />
      <Column field="Prezzo1" title="Importi" width="200px" />
      <Column field="IDSpCap" title="Quantità" width="150px" filter="numeric" editor='numeric' />
      <GridToolbar>
        <div onClick={closeEdit}>
          <button
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={addRecord}
          >
            Add new
          </button>
          <button
            title='Close Edit'
            style={margin}
            className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
            onClick={closeEdit}>
            Close Edit
          </button>
          <button
            title="Export PDF"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            onClick={exportPDF}
          >
            Export PDF
          </button>
        </div>
        <div>
          <p>Search:</p>
          <Input onChange={filterData} />
        </div>
      </GridToolbar>
    </Grid>
  );

  function handleClick() {
    close(false)
    open(true)
    setEditID(null)
  }

  return (
    <div>
      <div className='flex'>
        <div>
          <button
            title='Listino'
            className='k-button k-button-md k-button-solid k-button-solid-secondary'
            onClick={handleClick}>
            Listino
          </button>
          <button
            title='Computo'
            className='k-button k-button-md k-button-solid k-button-solid-primary'>
            Computo
          </button>
        </div>
        <button>IMPOSTAZIONI</button>
      </div>
      {grid}
      <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
        {grid}
      </GridPDFExport>
    </div>
  )
}

ComputoTab.propTypes = {
  close: PropTypes.func,
  open: PropTypes.func,
};

ComputoTab.defaultProps = {
  close: () => {},
  open: () => {},
};

export default ComputoTab;
