const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const newData = JSON.parse(event.body);
    const filePath = path.resolve(__dirname, 'src/log.json');

    // Leggi il contenuto del file JSON
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonArray = JSON.parse(data);

    // Aggiungi il nuovo oggetto all'array
    jsonArray.push(newData);

    // Scrivi il file JSON aggiornato
    fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), 'utf8');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File JSON aggiornato con successo' }),
    };
  } catch (error) {
    console.error('Errore durante l\'elaborazione:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nel leggere o salvare il file JSON' }),
    };
  }
};