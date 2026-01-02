// ID de votre Spreadsheet
const SHEET_ID = "19q2A-hr9vwBPcJpQ6I1j37o7VjXb8tEAP69HSjdO8p0";
const SHEET_NAME = "Engagés";

/* 
 * 1. SETUP INITIAL
 * Exécutez cette fonction "setupSheet" une seule fois depuis l'éditeur d'Apps Script 
 * pour préparer votre feuille de calcul.
 */
function setupSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Créer l'onglet s'il n'existe pas
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Définir les en-têtes
  const headers = ["Date", "Nom Complet", "Organisation", "Fonction", "Contact", "Engagement"];
  
  // Vérifier si les en-têtes existent déjà
  const range = sheet.getRange(1, 1, 1, headers.length);
  if (range.getValue() === "") {
    range.setValues([headers]);
    sheet.setFrozenRows(1);
    range.setFontWeight("bold");
    range.setBackground("#f7f2de"); // Couleur du thème ;)
  }
}

/*
 * 2. RECEPTION DES DONNEES (Formulaire Web)
 * Cette fonction s'exécute quand le formulaire envoie des données.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    // Récupération des paramètres envoyés par le formulaire
    // Les noms des paramètres doivent correspondre aux 'name' des inputs HTML
    const nom = e.parameter.name;
    const org = e.parameter.org;
    const func = e.parameter.function; // 'function' est un mot réservé, mais e.parameter["function"] fonctionne
    const contact = e.parameter.contact;
    const engagement = e.parameter.commitment;
    const date = new Date();

    // Ajout de la ligne
    sheet.appendRow([date, nom, org, e.parameter["function"], contact, engagement]);

    // Réponse JSON succès pour le site web
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    // Gestion d'erreur
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
