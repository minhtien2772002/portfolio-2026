const readline = require("node:readline/promises");
const { stdin, stdout } = require("node:process");
const {
  FarewellManagerError,
  normalizeBirthYear,
  normalizeCompanyCode,
  normalizeFullName,
  normalizeInitials,
  persistRecipient,
  prepareRecipient,
} = require("./farewell-manager-lib.cjs");

async function askValid(interface_, prompt, normalize) {
  while (true) {
    const answer = await interface_.question(prompt);
    try {
      return normalize(answer);
    } catch (error) {
      stdout.write(`\n${error.message}\n\n`);
    }
  }
}

async function main() {
  const interface_ = readline.createInterface({ input: stdin, output: stdout });
  try {
    stdout.write("\nAdd a /4ever recipient\n\n");
    const company = await askValid(interface_, "1. Company code (three letters, e.g. ADZ): ", normalizeCompanyCode);
    const fullName = await askValid(interface_, "2. Full name: ", normalizeFullName);
    const birthYear = await askValid(interface_, "3. Last two digits of birth year: ", normalizeBirthYear);
    const initials = await askValid(interface_, "4. Two name initials: ", normalizeInitials);
    const recipient = prepareRecipient({ company, fullName, birthYear, initials });

    stdout.write(`\nGenerated personal key: ${recipient.key}\n`);
    stdout.write("Save this key somewhere secure. The plaintext key will not be written to the project.\n");
    stdout.write(`Protected folder: ${recipient.id}\n\n`);
    const confirmation = (await interface_.question("Create this recipient? Type YES to continue: ")).trim().toUpperCase();
    if (confirmation !== "YES") {
      stdout.write("\nCancelled. No files were changed.\n");
      return;
    }

    const result = persistRecipient(recipient);
    stdout.write("\nRecipient created successfully.\n");
    stdout.write(`Edit the letter: ${result.letterPath}\n`);
    stdout.write(`Add photos here: ${result.imagesPath}\n`);
    stdout.write("Run npm run farewell:list at any time to review registered recipients.\n");
  } finally {
    interface_.close();
  }
}

main().catch((error) => {
  const message = error instanceof FarewellManagerError ? error.message : `Unexpected error: ${error.message}`;
  console.error(`\nCould not add the recipient. ${message}`);
  process.exitCode = 1;
});
