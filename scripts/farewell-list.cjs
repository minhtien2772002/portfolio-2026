const {
  FarewellManagerError,
  formatTable,
  recipientRows,
} = require("./farewell-manager-lib.cjs");

try {
  const rows = recipientRows();
  if (!rows.length) console.log("No /4ever recipients are registered yet.");
  else console.log(`\n${formatTable(rows)}\n`);
} catch (error) {
  const message = error instanceof FarewellManagerError ? error.message : `Unexpected error: ${error.message}`;
  console.error(`Could not list recipients. ${message}`);
  process.exitCode = 1;
}
