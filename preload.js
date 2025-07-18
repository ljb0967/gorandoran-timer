const { contextBridge, ipcRenderer } = require("electron");

// 렌더러와 메인 프로세스 사이의 안전한 통신을 위한 preload 스크립트
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("electronAPI", {
  // 직접 ipcRenderer를 노출하지 않고 필요한 함수만 노출
  navigate: (page) => ipcRenderer.send("navigate", page),
  sendMessage: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) => ipcRenderer.on(channel, func),
  onResize: (callback) => ipcRenderer.on("window-resized", callback),
});

// 페이지 로드 시 실행
window.addEventListener("DOMContentLoaded", () => {
  console.log("페이지가 로드되었습니다!");
});
