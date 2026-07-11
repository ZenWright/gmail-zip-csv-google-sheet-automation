function update90DaysFunnelReport() {

  const SUBJECT = "SV Ops Rolling Funnel Report Last 90 Days";
  const SPREADSHEET_ID = "1myWCBHBfcu2TrpS-kIxQrnC4ZPjQCVJyg3PuC3iKi2I";
  const SHEET_NAME = "90_days_funnel";

  Logger.log("===== START =====");

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const threads = GmailApp.search(
    `subject:"${SUBJECT}" has:attachment`,
    0,
    20
  );

  if (threads.length === 0) {
    throw new Error("No email found.");
  }

  let latestMessage = null;

  threads.forEach(thread => {
    thread.getMessages().forEach(msg => {
      if (!latestMessage || msg.getDate() > latestMessage.getDate()) {
        latestMessage = msg;
      }
    });
  });


  Logger.log("Latest Email : " + latestMessage.getDate());


  const zipAttachment = latestMessage.getAttachments().find(file =>
    file.getName().toLowerCase().endsWith(".zip")
  );


  if (!zipAttachment) {
    throw new Error("ZIP attachment not found.");
  }


  const files = Utilities.unzip(zipAttachment.copyBlob());


  const csvBlob = files.find(file =>
    file.getName().toLowerCase().endsWith(".csv")
  );


  if (!csvBlob) {
    throw new Error("CSV not found inside ZIP.");
  }


  const csvData = Utilities.parseCsv(
    csvBlob.getDataAsString("UTF-8")
  );


  const headers = csvData[0];
  const rows = csvData.slice(1);


  const BUYER_ID = 2;       
  const PROJECT_ID = 5;     
  const TYPE_OF_LEAD = 18;  
  const CALL_STATUS = 19;   


  const unique = new Set();
  const output = [];


  rows.forEach(row => {

    if (!row || row.length === 0) return;


    if (String(row[TYPE_OF_LEAD]).trim() === "Online With Pickup Details") {
      return;
    }


    if (String(row[CALL_STATUS]).trim() === "DND") {
      return;
    }


    const key =
      String(row[BUYER_ID]).trim()
      +
      "|"
      +
      String(row[PROJECT_ID]).trim();


    if (!unique.has(key)) {
      unique.add(key);
      output.push(row);
    }

  });


  sheet.clearContents();


  sheet.getRange(1,1,1,headers.length)
       .setValues([headers]);


  if (output.length > 0) {

    sheet.getRange(2,1,output.length,headers.length)
         .setValues(output);

  }


  // Extra blank column for Team lookup
  sheet.getRange(1, headers.length + 1)
       .setValue("Team");


  Logger.log("===== COMPLETED =====");
  Logger.log("Rows Written : " + output.length);

}
