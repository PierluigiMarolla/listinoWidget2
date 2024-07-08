const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  console.log('Event:', event);
  console.log('Context:', context);

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const newData = JSON.parse(event.body);
    const filePath = path.resolve(__dirname, 'src/log.json');
    
    // Log the file path
    console.log('File path:', filePath);

    // Verifica se il file esiste
    if (!fs.existsSync(filePath)) {
      console.error('File non trovato:', filePath);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'File non trovato' }),
      };
    }

    // Leggi il contenuto del file JSON
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('Contenuto del file JSON:', data);

    const jsonArray = JSON.parse(data);

    // Aggiungi il nuovo oggetto all'array
    jsonArray.push(newData);

    // Scrivi il file JSON aggiornato
    fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), 'utf8');
    console.log('File JSON aggiornato con successo');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File JSON aggiornato con successo' }),
    };
  } catch (error) {
    console.error('Errore durante l\'elaborazione:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nel leggere o salvare il file JSON', details: error.message }),
    };
  }
};