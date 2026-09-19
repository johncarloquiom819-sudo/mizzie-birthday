# Mizzie's Birthday Website 💌

A small mobile-first website you can send her as a link. No coding knowledge needed to customize it.

## 1. Add your photos
Put 1–6 photos in the `images/` folder, named exactly:
`photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`, `photo6.jpg`

(`.png` works too — just also change the file extension inside `index.html` for that photo, e.g. `photo1.png`.)

Don't have 6 photos? Leave the missing ones as-is — they'll show a cute placeholder instead of a broken image.

## 2. Add your song
Put one song file in the `music/` folder, named exactly:
`your-song.mp3`

Keep the file under ~8–10MB so the page loads quickly on mobile data. If your file is bigger, compress it first (any free "mp3 compressor" site works).

## 3. Personalize the text
Open these files in any text editor (Notepad, TextEdit, or even GitHub's own editor — no special app needed):

- **`index.html`** — the letter near the bottom (search for "My Love,") and the `[Your Name]` signature. Also has photo captions you can rewrite.
- **`script.js`** — right at the top: the `REASONS` list and the `QUIZ` questions. Add, remove, or rewrite any line inside the quotes.

## 4. Put it on GitHub so she can open it by link

1. Go to [github.com](https://github.com) and log in (or create a free account).
2. Click the **+** in the top right → **New repository**.
3. Name it something like `mizzie-birthday` → make sure it's **Public** → click **Create repository**.
4. On the new repo page, click **uploading an existing file**, then drag in all the files and folders from this project (`index.html`, `style.css`, `script.js`, the `images` folder, and the `music` folder) → **Commit changes**.
5. Go to the repo's **Settings** tab → **Pages** (left sidebar).
6. Under "Branch," choose `main` and `/root`, then **Save**.
7. Wait about a minute, then refresh — GitHub will show a link like:
   `https://yourusername.github.io/mizzie-birthday/`

That link is what you send her. Open it yourself first on your phone to make sure everything loads the way you want.

## Notes
- The "days together" counter updates itself automatically based on the date in `script.js` — you don't need to touch it again.
- Because of how phones handle sound, the music won't play until she actually taps to open the gift — that's expected, not a bug.
