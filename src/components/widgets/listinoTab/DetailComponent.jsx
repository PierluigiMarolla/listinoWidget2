import React from 'react';
import AutoCompleteSelect from './../autoCompleteSelect/AutoCompleteSelect';

const DetailComponent = React.memo(({ dataItem, updateDataItem }) => {
    const [p1, setP1] = React.useState(dataItem.Prezzo1);
    const [usaAnalisi, setUsaAnalisi] = React.useState(false);
    const [tabPropOpen, setTabPropOpen] = React.useState(true);
    const [tabAnalisiOpen, setTabAnalisiOpen] = React.useState(false);
    const [sicurezza, setSicurezza] = React.useState(dataItem.IncSIC);
    const [manodopera, setManodopera] = React.useState(dataItem.IncMDO);
    const [attrezzature, setAttrezzature] = React.useState(dataItem.IncATTR);
    const [materiali, setMateriali] = React.useState(dataItem.IncMAT);

    const p1Changer = React.useCallback((newValue) => {
        setP1(newValue);
        setUsaAnalisi(true);
        updateDataItem({ ...dataItem, Prezzo1: newValue });
    }, [dataItem, updateDataItem]);

    React.useEffect(() => {
        if (usaAnalisi) {
            updateDataItem({ ...dataItem, Prezzo1: p1 });
        }
    }, [p1, usaAnalisi, dataItem, updateDataItem]);

    const openProp = () => {
        setTabAnalisiOpen(false);
        setTabPropOpen(true);
    };

    const openAnalisi = () => {
        setTabPropOpen(false);
        setTabAnalisiOpen(true);
    };

    const handleSicurezzaChange = (event) => {
        const updatedSicurezza = event.target.value;
        setSicurezza(updatedSicurezza);
        updateDataItem({ ...dataItem, IncSIC: updatedSicurezza });
    };

    const handleManodoperaChange = (event) => {
        const updatedManodopera = event.target.value;
        setManodopera(updatedManodopera);
        updateDataItem({ ...dataItem, IncMDO: updatedManodopera });
    };

    const handleAttrezzatureChange = (event) => {
        const updatedAttrezzature = event.target.value;
        setAttrezzature(updatedAttrezzature);
        updateDataItem({ ...dataItem, IncATTR: updatedAttrezzature });
    };

    const handleMaterialiChange = (event) => {
        const updatedMateriali = event.target.value;
        setMateriali(updatedMateriali);
        updateDataItem({ ...dataItem, IncMAT: updatedMateriali });
    };

    const p1Restore = () => {
        setUsaAnalisi(false);
        setP1(dataItem.Prezzo1);
    };

    const stateChanger = () => {
        setUsaAnalisi(true);
    };

    const updateLavorazioni = (newLavorazioni) => {
        updateDataItem({ ...dataItem, analisi: newLavorazioni });
    };

    console.log(p1)

    return (
        <>
            <section className={tabPropOpen ? "tabOpen" : "tabClosed"}>
                <div>
                    <button>Proprietà</button>
                    <button onClick={openAnalisi}>Analisi</button>
                </div>
                <p><strong>Tariffa:</strong> {dataItem.Tariffa}</p>
                <p><strong>Articolo:</strong> {dataItem.Articolo}</p>
                <p><strong>DesRidotta:</strong> {dataItem.DesRidotta}</p>
                <p><strong>DesEstesa:</strong> {dataItem.DesEstesa}</p>
                <p><strong>UnMisura:</strong> {dataItem.UnMisura}</p>
                <p><strong>Data:</strong> {dataItem.Data}</p>
                <p><strong>Prezzo1:</strong> {!usaAnalisi ? dataItem.Prezzo1 : p1}</p>
                <p><strong>Prezzo2:</strong> {dataItem.Prezzo2}</p>
                <p><strong>Prezzo3:</strong> {dataItem.Prezzo3}</p>
                <p><strong>Prezzo4:</strong> {dataItem.Prezzo4}</p>
                <p><strong>Prezzo5:</strong> {dataItem.Prezzo5}</p>
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
                        <strong>Incidenza Manodopera:</strong>
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
                <AutoCompleteSelect
                    p1Changer={p1Changer}
                    updateDetailComponent={updateLavorazioni}
                    detProps={dataItem}
                />
            </section>
        </>
    );
});

export default DetailComponent;