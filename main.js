// Electron 모듈 불러오기
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

let mainWindow;

// 브라우저 윈도우 생성 함수
const createWindow = () => {
  // 브라우저 윈도우 생성
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    minWidth: 400, // 최소 창 크기 설정
    minHeight: 300,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // HTML 파일 로드
  mainWindow.loadFile("time-settings.html");

  mainWindow.on("resize", () => {
    // 필요시 창 크기 정보를 렌더러에 전달
    const [width, height] = mainWindow.getSize();
    mainWindow.webContents.send("window-resized", { width, height });
  });
};

// Electron이 준비되면 윈도우 생성
app.whenReady().then(() => {
  createWindow();

  // macOS의 경우 윈도우가 닫혀도 앱이 종료되지 않음
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 윈도우가 모두 닫히면 앱 종료 (macOS 제외)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("navigate", (event, page) => {
  const sender = event.sender;
  sender.loadFile(page);
});
