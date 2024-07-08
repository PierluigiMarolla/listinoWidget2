import React from 'react'
import PropTypes from "prop-types"
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import log from "./../../../log.json"

const Log = ({ openLog, logValue }) => {

    const handleXClick = () => {
        openLog(false)
    }

    return (
        <div className='log-background'>
            <div className='log-container'>
                <div className='log-title-section'>
                    <h2><strong>LOG DELLE MODIFICHE</strong></h2>
                    <button
                    title='Close Log'
                    onClick={handleXClick}
                    className='log-X-button'
                    >
                        X
                    </button>
                </div>
               
                <Grid
                    style={{
                        height: "400px",
                    }}
                    data={log}
                >
                    <GridColumn field="Tariffa" title="Tariffa" width="120px" />
                    <GridColumn field="Modifica" title="Modifica" width="300x" />
                    <GridColumn field="Utente" title="Utente" />
                    <GridColumn field="Orario" title="Orario" />
                </Grid>
            </div>
        </div>
    )
}

Log.propTypes = {
    openLog: PropTypes.func,
    logValue: PropTypes.bool,
};

Log.defaultProps = {
    openLog: () => { },
    logValue: true,
};

export default Log