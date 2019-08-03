const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  shell,
} = require('electron')
const apiServer = require("./server/app");
const {
  server
} = require("./app.config");
const path = require("path");
const {
  exec
} = require('child_process');


const isProd = process.env.NODE_ENV !== "development";

const SYS_MAP = {
  'darwin': {
    shortcuts: {
      'devtools': 'Alt+Command+I'
    }
  },
  'win32': {
    shortcuts: {
      'devtools': 'Ctrl+Shift+I'
    }
  },
  'linux': {
    shortcuts: {
      'devtools': 'Ctrl+Shift+I'
    }
  }
};

const SYS_CONF_MAP = SYS_MAP[process.platform] || {};

// 在窗口外打开网页
function openWeb(url) {
  shell.openExternal(url);
}

// 当前窗口渲染网页 没有效果
function openWebView(url){
  // 获取当前窗口Id
  const win = BrowserWindow.getFocusedWindow();
  win.webContents.send("openwebview", url);
}

const template = [{
    label: "app",
    submenu: [{
        label: '关于 douban-movie-electron',
        role: 'about',
        click: function () {
          openWeb(
            'https://github.com/GolderBrother/douban-movie-electron')
        }
      },
      {
        type: "separator",
      },
      {
        label: '退出',
        accelerator: 'Cmd+Q',
        role: 'quit'
      }
    ]
  },
  {
    label: "编辑",
    submenu: [{
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }
    ]
  },
  {
    label: '窗口',
    submenu: [{
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '重载',
        accelerator: 'CmdOrCtrl+R',
        role: 'reload'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      }
    ]
  },
  {
    label: '调试',
    submenu: [{
      label: '切换开发者工具',
      accelerator: SYS_CONF_MAP['shortcuts']['devtools'],
      click: function (_ev, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    }]
  },
  {
    label: '加载网页',
    submenu: [{
      label: 'GitHub',
      role: 'loadWeb',
      accelerator: 'CmdOrCtrl+A',
      click: function () {
        openWeb('https://github.com/GolderBrother')
      }
    }]
  },
];


if (isProd) {
  // start api server
  apiServer.listen(server.port, () => {
    console.log(server.url);
  });
} else {
  // start webpack-devserver
  require("./scripts/start");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// 当 Electron 完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
// 有些 API 只能在该事件发生后才能被使用
app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1160,
    height: 720,
    // minWidth: 1160,
    // minHeight: 720, 
    useContentSize: true,
    resizable: true,
    transparent: true,
    backgroundColor: "#99333333", // #<aarrggbb>
    titleBarStyle: "hiddenInset",
    webPreferences: {
      webSecurity: false,
      // 解决electron渲染进程报错：require is not defined
      nodeIntegration: true, // 是否集成 Nodejs
    }
  });

  if (isProd) {
    mainWindow.loadFile(path.join(__dirname, "./build/index.html"));
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  let playWin = null;

  ipcMain.on("open-page-video", (ev, info) => {
    if (playWin) playWin.destroy();

    playWin = new BrowserWindow({
      width: 1100,
      height: 500,
      titleBarStyle: "hiddenInset",
    });

    let options = {
      query: {
        info: JSON.stringify(info),
      }
    };

    if (isProd) {
      playWin.loadFile(path.join(__dirname, "./build/play.html"),
        options);
    } else {
      playWin.loadFile(path.join(__dirname, "./public/play.html"),
        options);
    }

    playWin.focus();
  });

  ipcMain.on("open-dialog-msg", (_ev, info) => {
    dialog.showMessageBox(playWin, {
      message: info,
    });
  });

  // 添加系统托盘功能
  require("./src/main/tray.js")
});

app.on('before-quit', () => {
  // stop api server
  process.exit();
});
