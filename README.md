# Christmas Gift Exchange (Secret Santa) — Fair, Transparent, Open Source

Live demo: https://wsjwong.github.io/christmas-gift-exchange-tool/

A tiny, dependency‑free Secret‑Santa style gift drawing tool for holiday gatherings. Label the gifts with numbers 1..N, enter the number of participants, and draw gift numbers one by one. The UI supports English and Traditional Chinese (HK), and everything runs entirely in the browser — no server and no data collection.

- Fairness: Uses an unbiased Fisher–Yates shuffle for a uniform random order.
- Transparency: 100% client‑side and open source — anyone can inspect or self‑host.
- Privacy: No accounts, no tracking, no network calls.


## Demo / How it works
1. Physically label the gifts with numbers 1..N.
2. Open the site and enter the number of participants.
3. Click “Draw Gift” to reveal the gift number for each participant.
4. After the last draw, review the list or restart.
5. Toggle languages anytime using the globe button.

UI and logic live in these files:
- `index.html` — structure and language toggle button
- `script.js` — state machine, draw logic, and translations
- `style.css` — layout and styling

## Screenshots

Desktop

![Desktop screenshot](docs/screenshot-desktop.png)

Mobile

![Mobile screenshot](docs/screenshot-mobile.png)


## Fairness & Openness
- Unbiased draw: The draw order is generated with a Fisher–Yates shuffle over `[1..N]`. Each order is equally likely.
- Fully open: The code is small and readable; anyone can verify exactly how the draw happens or run it locally.
- No hidden state: All logic runs in your browser; nothing is stored or sent anywhere.

Practical tips to keep your exchange fair:
- Label gifts clearly with their numbers before starting.
- Fix the participant count before the first draw.
- Share the screen (or use a projector) so everyone can see each draw.
- If you need to restart, use the built‑in Restart button.

Optional (for stricter randomness): You can swap `Math.random()` for the browser’s cryptographic RNG (`window.crypto.getRandomValues`) in the shuffle. The current implementation is already uniform; a CSPRNG is an extra precaution some groups prefer.


## Run locally
Because it’s a static site, you can run it by simply opening `index.html`. For a local server (recommended for some browsers):

- Python 3
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

- Node (one‑off)
```bash
npx serve .
```


## Host it (e.g. GitHub Pages)
- Push this repository to GitHub.
- Enable GitHub Pages for the repository (Settings → Pages → Deploy from branch → `main` → `/` root).
- Visit your Pages URL and share it with your group.


## Contributing
Issues and PRs are welcome! This is a fun, small project — contributions that improve accessibility, add constraints (e.g., exclusions), or enhance fairness (e.g., optional CSPRNG mode) are great.


## License
MIT License — see `LICENSE` for details.


---

# 聖誕交換禮物（Secret Santa）— 公平、透明、開源（香港繁體）

即時試用（GitHub Pages）：https://wsjwong.github.io/christmas-gift-exchange-tool/

這是一個細小、無相依（dependency‑free）的交換禮物抽籤工具。先把禮物實物貼上 1..N 編號，輸入參加人數，逐個抽出禮物號碼。介面支援英文及香港繁體中文，全部在瀏覽器本機運行 — 無需伺服器、無需登入、亦不會收集任何資料。

- 公平：以 Fisher–Yates 洗牌演算法產生均勻隨機次序。
- 透明：完全開源、純前端，任何人都可檢視或自行架設。
- 私隱：沒有帳戶、沒有追蹤、沒有網絡請求。


## 示範／使用方法
1. 先把所有禮物貼上 1..N 編號。
2. 打開網站並輸入參與人數。
3. 按「抽取禮物」，系統會逐一顯示該參加者抽中的禮物號碼。
4. 完成最後一位後，可查看清單或重新開始。
5. 可隨時按地球圖示切換英文／中文。

主要檔案：
- `index.html` — 結構與語言切換按鈕
- `script.js` — 狀態流程、抽籤邏輯與多語字串
- `style.css` — 版面與樣式


## 公平與開源
- 均勻抽籤：以 Fisher–Yates 洗牌於 `[1..N]` 產生完全等機率的次序。
- 完全開源：程式碼簡單易讀，人人可檢視運作原理或自架使用。
- 無隱藏狀態：所有邏輯僅在瀏覽器運行；沒有把資料儲存或上傳。

實務建議，令抽籤更公平：
- 開始前先把禮物編號貼好並清晰可見。
- 決定參與人數後才開始抽籤。
- 建議把畫面投影或分享，讓所有人同步見證抽籤過程。
- 需要重來可用內置的「重新開始」按鈕。

進一步加強隨機性（可選）：可把 `Math.random()` 改為瀏覽器的密碼學隨機來源（`window.crypto.getRandomValues`）。現行方案已屬均勻隨機；此舉屬額外保險措施，視乎活動需要。


## 本機執行
此專案是純靜態頁面，直接開啟 `index.html` 已可使用。如需本機伺服器（某些瀏覽器較推薦）：

- Python 3
```bash
python3 -m http.server 8000
# 之後以瀏覽器打開 http://localhost:8000
```

- Node（一次性）
```bash
npx serve .
```


## 發佈（例如 GitHub Pages）
- 把此倉庫推送到 GitHub。
- 在倉庫設定啟用 GitHub Pages（Settings → Pages → Deploy from branch → `main` → `/` root）。
- 以 Pages 網址與成員分享即可。


## 貢獻
歡迎開 Issue 或 PR！這是個輕鬆好玩的專案，歡迎改善無障礙、加入抽籤限制（例如避免某些配對）、或增設更強隨機性（例如可選用密碼學隨機）的功能。


## 授權
MIT 授權 — 詳情請參閱 `LICENSE` 檔案。
