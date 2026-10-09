# `/4ever` Recipient Manager

Run these commands from the `Portfolio 2026` project folder in Terminal.

## Add a person

```bash
npm run farewell:add
```

Answer the four questions, review the generated personal key, and type `YES` to confirm. Save the key somewhere secure because the project stores only its protected SHA-256 digest.

The command prints the new recipient folder name when it finishes.

## Edit their letter

Open:

```text
private/farewell/RECIPIENT-FOLDER/letter.md
```

Replace the starter text with the letter, then save the file.

## Add photos

Drag the recipient's photos into:

```text
private/farewell/RECIPIENT-FOLDER/images/
```

Keep these files inside `private/farewell`. Never move recipient letters or photos into `public`.

## Convert one recipient's photos to WebP

First, find the exact folder name:

```bash
npm run farewell:list
```

Then run:

```bash
npm run farewell:images RECIPIENT-FOLDER
```

Type `YES` to confirm. JPG, JPEG, and PNG files are converted to high-quality WebP. An original is deleted only after its WebP replacement is created successfully. Existing WebP and AVIF files are left unchanged.

## Convert all recipient photos to WebP

Run:

```bash
npm run farewell:images:all
```

The command scans every recipient's `images` folder and shows how many JPG, JPEG, and PNG files it found. Type exactly `YES` to confirm. It converts all eligible photos to high-quality WebP at once, leaves existing WebP and AVIF files unchanged, and keeps any original whose conversion fails.

## Deploy the changes

Check the project first:

```bash
npm test
npm run build
```

If both commands pass, commit and push the changed files to the Git repository connected to Vercel:

```bash
git add private/farewell/recipients.cjs private/farewell/RECIPIENT-FOLDER/
git commit -m "Add farewell recipient"
git push
```

Vercel should deploy the pushed commit automatically. Do not change or regenerate `FAREWELL_SESSION_SECRET`; all existing recipient sessions and keys use the current security system.
