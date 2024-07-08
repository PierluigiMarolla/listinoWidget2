import * as React from "react";
import { MultiColumnComboBox } from "@progress/kendo-react-dropdowns";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { CellRender, RowRender } from "./Rendererers";
import { MyCommandCell } from "./myCommandCell";
import { getItems, deleteItem } from "./../../../utils/services";
import { updateLavorazioni } from "./../../../utils/services"
import { filterBy } from "@progress/kendo-data-query";

const columns = [

  {
    field: "tariffa",
    header: "tariffa",
    width: "80px",
  },
  {
    field: "nomeLavorazione",
    header: "Name",
    width: "500px",
  },
  {
    field: "costoUn",
    header: "Costo Unitario",
    width: "120px",
  },
  {
    field: "tipo",
    header: "Tipologia",
    width: "90px",
  },
];

const AutoCompleteSelect = ({ p1Changer, updateDetailComponent, detProps, nomeUtente, selectedRow, addLogAnalisi }) => {
  let analisiFatta = detProps.analisi
  const [lavorazioni, setLavorazioni] = React.useState(analisiFatta ? analisiFatta : []);
  const [saveState, setSaveState] = React.useState([]);
  const [subTotale, setSubTotale] = React.useState(0);
  const [subTotaleSicurezza, setSubTotaleSicurezza] = React.useState(0);
  const [percentualeSicurezzaDato, setPercentualeSicurezzaDato] = React.useState(2 / 100);
  const [percentualeSicurezza, setPercentualeSicurezza] = React.useState(0);
  const [subTotaleSGenerali, setSubTotaleSGenerali] = React.useState(0);
  const [percentualeSGeneraliDato, setPercentualeSGeneraliDato] = React.useState(15 / 100);
  const [percentualeSGenerali, setPercentualeSGenerali] = React.useState(0);
  const [percentualeUtili, setPercentualeUtili] = React.useState(0);
  const [percentualeUtiliDato, setPercentualeUtiliDato] = React.useState(10 / 100);
  const [totale, setTotale] = React.useState(0);
  const [changes, setChanges] = React.useState(false);
  const [popUpSicurezza, setPopUpSicurezza] = React.useState("")
  const [popUpSGenerali, setPopUpSGenerali] = React.useState("")
  const [popUpUtili, setPopUpUtili] = React.useState("")
  const [idCounter, setIdCounter] = React.useState(1)
  const [filter, setFilter] = React.useState(null);


  const [source, setSource] = React.useState([
    { nomeLavorazione: "LavorazioneA", tariffa: 1, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 10 },
    { nomeLavorazione: "LavorazioneB", tariffa: 2, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 234.56 },
    { nomeLavorazione: "LavorazioneC", tariffa: 3, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 345.67 },
    { nomeLavorazione: "LavorazioneD", tariffa: 4, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 456.78 },
    { nomeLavorazione: "LavorazioneE", tariffa: 5, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 78.90 },
    { nomeLavorazione: "LavorazioneF", tariffa: 6, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 89.01 },
    { nomeLavorazione: "LavorazioneG", tariffa: 7, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 90.12 },
    { nomeLavorazione: "LavorazioneH", tariffa: 8, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 101.23 },
    { nomeLavorazione: "LavorazioneI", tariffa: 9, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 112.34 },
    { nomeLavorazione: "LavorazioneJ", tariffa: 10, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 123.45 },
    { nomeLavorazione: "LavorazioneK", tariffa: 11, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 134.56 },
    { nomeLavorazione: "LavorazioneL", tariffa: 12, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 145.67 },
    { nomeLavorazione: "LavorazioneM", tariffa: 13, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 156.78 },
    { nomeLavorazione: "LavorazioneN", tariffa: 14, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 167.89 },
    { nomeLavorazione: "LavorazioneO", tariffa: 15, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 178.90 },
    { nomeLavorazione: "LavorazioneP", tariffa: 16, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 189.01 },
    { nomeLavorazione: "LavorazioneQ", tariffa: 17, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 190.12 },
    { nomeLavorazione: "LavorazioneR", tariffa: 18, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 201.23 },
    { nomeLavorazione: "LavorazioneS", tariffa: 19, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 212.34 },
    { nomeLavorazione: "LavorazioneT", tariffa: 20, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 223.45 },
    { nomeLavorazione: "LavorazioneU", tariffa: 21, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 234.56 },
    { nomeLavorazione: "LavorazioneV", tariffa: 22, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 245.67 },
    { nomeLavorazione: "LavorazioneW", tariffa: 23, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 256.78 },
    { nomeLavorazione: "LavorazioneX", tariffa: 24, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 267.89 },
    { nomeLavorazione: "LavorazioneY", tariffa: 25, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 278.90 },
    { nomeLavorazione: "LavorazioneZ", tariffa: 26, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 289.01 },
    { nomeLavorazione: "LavorazioneAA", tariffa: 27, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 290.12 },
    { nomeLavorazione: "LavorazioneBB", tariffa: 28, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 301.23 },
    { nomeLavorazione: "LavorazioneCC", tariffa: 29, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 312.34 },
    { nomeLavorazione: "LavorazioneDD", tariffa: 30, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 323.45 },
    { nomeLavorazione: "LavorazioneEE", tariffa: 31, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 334.56 },
    { nomeLavorazione: "LavorazioneFF", tariffa: 32, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 345.67 },
    { nomeLavorazione: "LavorazioneGG", tariffa: 33, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 356.78 },
    { nomeLavorazione: "LavorazioneHH", tariffa: 34, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 367.89 },
    { nomeLavorazione: "LavorazioneII", tariffa: 35, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 378.90 },
    { nomeLavorazione: "LavorazioneJJ", tariffa: 36, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 389.01 },
    { nomeLavorazione: "LavorazioneKK", tariffa: 37, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 390.12 },
    { nomeLavorazione: "LavorazioneLL", tariffa: 38, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 401.23 },
    { nomeLavorazione: "LavorazioneMM", tariffa: 39, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 412.34 },
    { nomeLavorazione: "LavorazioneNN", tariffa: 40, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 423.45 },
    { nomeLavorazione: "LavorazioneOO", tariffa: 41, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 434.56 },
    { nomeLavorazione: "LavorazionePP", tariffa: 42, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 445.67 },
    { nomeLavorazione: "LavorazioneQQ", tariffa: 43, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 456.78 },
    { nomeLavorazione: "LavorazioneRR", tariffa: 44, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 467.89 },
    { nomeLavorazione: "LavorazioneSS", tariffa: 45, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 478.90 },
    { nomeLavorazione: "LavorazioneTT", tariffa: 46, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 489.01 },
    { nomeLavorazione: "LavorazioneUU", tariffa: 47, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 490.12 },
    { nomeLavorazione: "LavorazioneVV", tariffa: 48, unita: "cad", tipo: "MT", tempoQuantita: 0, costoUn: 401.23 },
    { nomeLavorazione: "LavorazioneWW", tariffa: 49, unita: "h", tipo: "MDO", tempoQuantita: 0, costoUn: 412.34 },
    { nomeLavorazione: "LavorazioneXX", tariffa: 50, unita: "a corpo", tipo: "MDO", tempoQuantita: 0, costoUn: 423.45 }
  ]);


  const handleFilterChange = (event) => {
    const filterValues = event.filter.value.toLowerCase().split(' ');

    const filters = filterValues.map(value => ({
      logic: 'or',
      filters: [
        { field: 'nomeLavorazione', operator: 'contains', value: value },
        { field: 'tariffa', operator: 'contains', value: value }
      ]
    }));

    const newFilter = {
      logic: 'and',
      filters: filters
    };

    setFilter(newFilter);
  }





  const GridContext = React.createContext({});
  const CommandCell = (props) => {
    const { remove, cancel } =
      React.useContext(GridContext);
    return (
      <MyCommandCell
        {...props}
        remove={remove}
        cancel={cancel}
      />
    );
  };

 

  const remove = (dataItem) => {

    const newData = deleteItem(dataItem);
    setLavorazioni([...newData]);

    const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      addLogAnalisi({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stato rimosso ${dataItem.tariffa} dall'analisi`,
        Utente: nomeUtente,
        Orario: formattedDate
      })

    const { id, importo, ...cleanedDataItem } = dataItem;

    setSource((prevSource) => {
      const updatedSource = [...prevSource, cleanedDataItem];
      return updatedSource;
    });
  };

  const cancel = (dataItem) => {
    const originalItem = getItems().find(
      (p) => p.tariffa === dataItem.tariffa
    );
    const newData = lavorazioni.map((item) =>
      item.tariffa === originalItem.tariffa ? originalItem : item
    );
    setLavorazioni(newData);
  };

  const EDIT_FIELD = "inEdit";


  const enterEdit = (dataItem, field) => {
    const newLavorazioni = lavorazioni.map((item) => ({
      ...item,
      [EDIT_FIELD]: item.id === dataItem.id ? field : undefined,
    }));
    setLavorazioni(newLavorazioni);
  };

  const exitEdit = () => {
    const newLavorazioni = lavorazioni.map((item) => ({
      ...item,
      [EDIT_FIELD]: undefined,
    }));
    setLavorazioni(newLavorazioni);

    
  };

  const saveChanges = () => {
    source.splice(0, source.length, ...source);
    setSaveState(lavorazioni);
    setChanges(false);

  };

  const cancelChanges = () => {
    setLavorazioni(saveState);
    setChanges(false);
  };

  const itemChange = (event) => {
    const field = event.field || "";
    const newDataItem = {
      ...event.dataItem,
      [field]: event.value,
      importo: field === "tempoQuantita"
        ? parseFloat((event.value * event.dataItem.costoUn).toFixed(2))
        : parseFloat((event.dataItem.tempoQuantita * event.dataItem.costoUn).toFixed(2))
    };
    const newLavorazioni = lavorazioni.map((item) =>
      item.id === event.dataItem.id ? newDataItem : item
    );
    setLavorazioni(newLavorazioni);
    setChanges(true);
  };

  React.useEffect(() => {
    const subTotalCalculation = () => {
      const subTotalCalculated = lavorazioni.reduce((acc, item) => acc + (item.importo || 0), 0);
      setSubTotale(parseFloat(subTotalCalculated.toFixed(2)));

      const percentualeSicurezzaCalc = parseFloat((subTotalCalculated * percentualeSicurezzaDato).toFixed(2));
      setPercentualeSicurezza(percentualeSicurezzaCalc);

      const subTotaleSicurezzaCalc = parseFloat((subTotalCalculated + percentualeSicurezzaCalc).toFixed(2));
      setSubTotaleSicurezza(subTotaleSicurezzaCalc);

      const percentualeSGeneraliCalc = parseFloat((subTotaleSicurezzaCalc * percentualeSGeneraliDato).toFixed(2));
      setPercentualeSGenerali(percentualeSGeneraliCalc);

      const subTotaleSGeneraliCalc = parseFloat((subTotaleSicurezzaCalc + percentualeSGeneraliCalc).toFixed(2));
      setSubTotaleSGenerali(subTotaleSGeneraliCalc);

      const percentualeUtiliCalc = parseFloat((subTotaleSGeneraliCalc * percentualeUtiliDato).toFixed(2));
      setPercentualeUtili(percentualeUtiliCalc);

      const totaleCalc = parseFloat((subTotaleSGeneraliCalc + percentualeUtiliCalc).toFixed(2));
      setTotale(totaleCalc);
    };

    subTotalCalculation();
  }, [lavorazioni, percentualeSicurezzaDato, percentualeSGeneraliDato, percentualeUtiliDato]);

  React.useEffect(() => {
    updateLavorazioni(lavorazioni);
  }, [lavorazioni])

  React.useEffect((source) => {
    if (source) { // Controlla se source è definito
      const sortTariffa = (array) => {
        return array.slice().sort((a, b) => a.tariffa - b.tariffa);
      };
      const ordSource = sortTariffa(source);
      setSource(ordSource);
    }
  }, [source, lavorazioni])


  const addLav = (newLav) => {
    let newSource = source.filter(item => item !== newLav)
    const newLavWithImporto = {
      ...newLav,
      importo: newLav.tempoQuantita * newLav.costoUn,
      id: idCounter
    };
    const updatedArray = [...lavorazioni, newLavWithImporto];
    setLavorazioni(updatedArray);
    setSaveState(updatedArray);
    setIdCounter(idCounter + 1)
    setSource(newSource)

    /* const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      addLogAnalisi({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stato aggiunto ${newLav.tariffa} all'analisi`,
        Utente: nomeUtente,
        Orario: formattedDate
      }) */
  };


  const [valueLav, setValueLav] = React.useState(null);



  const handleChange = (event) => {
    if (event) {
      setValueLav(event.target.value);
      addLav(event.target.value);
      setValueLav(null);
    }
  };

  const customCellRender = (td, props) => (
    <CellRender
      originalProps={props}
      td={td}
      enterEdit={enterEdit}
      editField={EDIT_FIELD}
    />
  ); 

  const customRowRender = (tr, props) => (
    <RowRender
      originalProps={props}
      tr={tr}
      exitEdit={exitEdit}
      editField={EDIT_FIELD}
    />
  );

  const handleSave = () => {
    if (popUpSicurezza !== "") {
      setPercentualeSicurezzaDato(popUpSicurezza / 100);

      const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      addLogAnalisi({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stata modicata la percentuale sicurezza nell'analisi`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
    }
    if (popUpSGenerali !== "") {
      setPercentualeSGeneraliDato(popUpSGenerali / 100);

      const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      addLogAnalisi({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stata modicata la percentuale spese generali nell'analisi`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
    }
    if (popUpUtili !== "") {
      setPercentualeUtiliDato(popUpUtili / 100);

      const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      addLogAnalisi({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stata modicata la percentuale utili impresa nell'analisi`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
    }
  };

  const handleSaveP1 = () => {
    p1Changer(totale);
    updateDetailComponent(lavorazioni);

    const now = new Date();
      const formattedDate = now.toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }) + ' - ' + now.toLocaleTimeString('it-IT', {
        hour: '2-digit',
        minute: '2-digit',
      });

      addLogAnalisi({
        Tariffa: selectedRow.Tariffa,
        Modifica: `${selectedRow.Tariffa} è stata modificato il prezzo 1 dall'analisi`,
        Utente: nomeUtente,
        Orario: formattedDate
      })
  };

  const resetStandard = () => {
    setPercentualeSicurezzaDato(2 / 100);
    setPercentualeSGeneraliDato(15 / 100);
    setPercentualeUtiliDato(10 / 100);
    setPopUpSicurezza("")
    setPopUpSGenerali("")
    setPopUpUtili("")
  }



  return (
    <>
      <div className="col-xs-12 col-sm-7 example-col">
        <GridToolbar>
          <p>Lavorazioni:</p>
          <MultiColumnComboBox
            data={filter ? filterBy(source, filter) : source}
            columns={columns}
            value={valueLav}
            filterable={true}
            onFilterChange={handleFilterChange}
            textField={"nomeLavorazione"}
            onChange={handleChange}
            style={{
              width: "300px",
            }}
            placeholder="Seleziona le lavorazioni..."
          />
        </GridToolbar>
      </div>
      <div className="detGrid">
        <GridContext.Provider
          value={{
            remove,
            cancel
          }}
        >
          <Grid
            data={lavorazioni}
            dataItemKey={"id"}
            onItemChange={itemChange}
            cellRender={customCellRender}
            rowRender={customRowRender}
            editField={EDIT_FIELD}
          >
            <GridToolbar>
              <button
                title="Save Changes"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                onClick={saveChanges}
                disabled={!changes}
              >
                Save Changes
              </button>
              <button
                title="Cancel Changes"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                onClick={cancelChanges}
                disabled={!changes}
              >
                Cancel Changes
              </button>
            </GridToolbar>
            <Column field="tariffa" title='Tariffa' width={"150px"} editable={false}></Column>
            <Column field="nomeLavorazione" title='Lavorazione' width={"800px"} editable={false}></Column>
            <Column field="unita" title='Unità' width={"80px"} editable={false}></Column>
            <Column field="tempoQuantita" width={"140px"} title='Tempo / Quantità' editor="numeric"></Column>
            <Column field="costoUn" title='Costo Unitario' width={"120px"} editable={false}></Column>
            <Column field="importo" title='Importo' width={"90px"} editable={false}></Column>
            <Column field="tipo" title='Tipologia' width={"100px"} editable={false}></Column>
            <Column cell={CommandCell} width="240px" />
          </Grid>
        </GridContext.Provider>
        <div>
          <p>Sommano: €{subTotale}</p>
          <p>Oneri Sicurezza
            <input
              type="number"
              placeholder="2"
              value={popUpSicurezza}
              name="sicurezza"
              onChange={(e) => setPopUpSicurezza(e.target.value)}
            />
            %: €{percentualeSicurezza}
          </p>
          <p>---</p>
          <p>Sommano: €{subTotaleSicurezza}</p>
          <p>Spese Generali
            <input
              type="number"
              placeholder="15"
              value={popUpSGenerali}
              name="generali"
              onChange={(e) => setPopUpSGenerali(e.target.value)}
            />
            % * ({percentualeSicurezza}): €{percentualeSGenerali}
          </p>
          <p>---</p>
          <p>Sommano: €{subTotaleSGenerali}</p>
          <p>Utili Impresa
            <input
              type="number"
              placeholder="10"
              value={popUpUtili}
              name="utili"
              onChange={(e) => setPopUpUtili(e.target.value)}
            />
            % * ({percentualeSGenerali}): €{percentualeUtili}
          </p>
          <p>---</p>
          <h1>T O T A L E euro/ a corpo: {totale}</h1>
          <div className="input-container">
            <button onClick={resetStandard}>Ripristina Standard</button>
            <button onClick={handleSave}>Salva</button>
            <button onClick={handleSaveP1}>Modifica Prezzo 1</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AutoCompleteSelect;