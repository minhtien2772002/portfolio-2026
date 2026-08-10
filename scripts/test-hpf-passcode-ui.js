const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

async function run() {
  const {
    HPF_MASK_GLYPH,
    getHpfPasscodeCellStates,
    sanitizeHpfPasscode,
    shouldAutoSubmitHpfPasscode,
  } = await import(pathToFileURL(path.join(root, "src/components/hpf-passcode.mjs")));

  assert.equal(HPF_MASK_GLYPH, "*");

  assert.equal(sanitizeHpfPasscode(" 2a0-0!2 "), "2002");
  assert.equal(sanitizeHpfPasscode("123456"), "1234");
  assert.equal(shouldAutoSubmitHpfPasscode("200", false, false), false);
  assert.equal(shouldAutoSubmitHpfPasscode("2002", false, false), true);
  assert.equal(shouldAutoSubmitHpfPasscode("2002", true, false), false);
  assert.equal(shouldAutoSubmitHpfPasscode("2002", false, true), false);

  const initial = getHpfPasscodeCellStates("", true);
  assert.equal(initial[0].active, true);
  assert.equal(initial.slice(1).some((cell) => cell.active), false);

  const partial = getHpfPasscodeCellStates("20", true);
  assert.deepEqual(partial.map((cell) => cell.mask), [HPF_MASK_GLYPH, HPF_MASK_GLYPH, "", ""]);
  assert.equal(partial[2].active, true);

  const complete = getHpfPasscodeCellStates("2002", true);
  assert.deepEqual(complete.map((cell) => cell.mask), Array(4).fill(HPF_MASK_GLYPH));
  assert.doesNotMatch(complete.map((cell) => cell.mask).join(""), /[0-9]/);
  assert.equal(complete.map((cell) => cell.mask).join(""), "****");

  const afterBackspace = getHpfPasscodeCellStates("200".slice(0, -1), true);
  assert.deepEqual(afterBackspace.map((cell) => cell.mask), [HPF_MASK_GLYPH, HPF_MASK_GLYPH, "", ""]);
  assert.equal(afterBackspace[2].active, true);

  let requestCount = 0;
  let submitting = false;
  const attemptAutoSubmit = (value) => {
    if (!shouldAutoSubmitHpfPasscode(value, submitting, false)) return;
    submitting = true;
    requestCount += 1;
  };
  attemptAutoSubmit("2002");
  attemptAutoSubmit("2002");
  assert.equal(requestCount, 1);

  const appSource = fs.readFileSync(path.join(root, "src/app.js"), "utf8");
  const styleSource = fs.readFileSync(path.join(root, "src/styles.css"), "utf8");
  assert.match(appSource, /type="password"/);
  assert.match(appSource, /inputmode="numeric"/);
  assert.match(appSource, /autofocus/);
  assert.match(appSource, /aria-label="Secure 4-digit passcode"/);
  assert.match(appSource, /body: JSON\.stringify\(\{ passcode: input\.value, visitId: hpfVisitId \}\)/);
  assert.match(appSource, /hpfVisitAccessToken = ""/);
  assert.match(appSource, /data-hpf-asset-name/);
  assert.doesNotMatch(appSource, /credentials:\s*"same-origin"/);
  assert.match(appSource, /document\.querySelector\("\.hpf-access-page"\)\?\.classList\.add\("is-unlocking"\)/);
  assert.match(styleSource, /\.hpf-access-page\.is-unlocking \.hpf-access-content/);
  assert.match(styleSource, /\.study-detail-page--hpf\.is-hpf-unlock-enter/);
  assert.match(styleSource, /\.hpf-passcode-cell\s*\{[\s\S]*?font-family:\s*var\(--font-syne\);[\s\S]*?font-size:\s*56px;[\s\S]*?font-weight:\s*500;[\s\S]*?line-height:\s*64px;/);

  console.log("HPF passcode UI tests passed (masking, focus state, paste/backspace, and single auto-submit). ");
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
