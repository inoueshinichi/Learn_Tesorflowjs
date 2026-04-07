// Electron
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// Node.js standard
import path, { join } from 'node:path'
import v8 from 'node:v8'
import { writeHeapSnapshot } from 'node:v8'
import http from 'node:http'

// Node.js 3rd parties
import express from 'express'
import nunjucks from 'nunjucks'
import multer from 'multer'
import dotenv from 'dotenv'
import { createHttpTerminator, HttpTerminator } from 'http-terminator'

// Utils
import { getFileTimestamp } from './utils'

// Web Server
const server = express()
let httpServer: http.Server = new http.Server()
const WEB_SERVER_PORT: number = 3000
let httpTerminator: HttpTerminator | null = null  

// Web Socket Server
import { SocketServer } from './websocket'
const WEB_SOCKET_PORT: number = 3001
const wsServer: SocketServer = new SocketServer(WEB_SOCKET_PORT)

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  /*Express Server*/
  httpServer = server.listen(WEB_SERVER_PORT, () => {
    console.log(`Express server is running on port ${WEB_SERVER_PORT}`);
  })
  httpTerminator = createHttpTerminator({
    server: httpServer,
  })

  /*WebSocket Server*/
  wsServer.start()

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // Express Server 停止
  httpServer.close((err?: Error) => {
    if (err) {
      console.error('HttpServerが停止中にエラーが発生しました:', err)
      return
    }
    console.log('HttpServerが正常に停止しました')
  })

  // Websocket Server 停止
  wsServer.stop()


  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



/* ----------- Express Setting ----------- */

// POST時のbodyのエンコード方式(3つ) 
// 1) application/x-www-form-encoded
// 2) multipart/form-data
// 3) application/json
// https://zenn.dev/bigen1925/books/introduction-to-web-application-with-python/viewer/post-parameters
// URLエンコード https://qiita.com/sisisin/items/3efeb9420cf77a48135d
// https://expressjs.com/en/4x/api.html#express.json

// application/x-www-form-encoded形式に対応
server.use(express.urlencoded({ extended: true }));

// multipart/form-data形式に対応
const multerStorage = multer.diskStorage({
    destination: path.join(app.getPath('userData'), 'uploads'), // Electron環境下のディレクトリを指定
    filename: (req, file, callback) => {
        callback(null, file.filename + '_' + getFileTimestamp() + path.extname(file.originalname))
    }
})
const multerMiddleware = multer({ storage: multerStorage })

// application/json形式に対応
server.use(express.json());

// 公開フォルダ
server.use(express.static(path.join(app.getPath('appData'), "public")))

// SSR エンジン
server.set('views', path.join(app.getPath('appData'), 'views'))
nunjucks.configure('views', { autoescape: true, express: server })
server.set('view engine', 'html')


// SSR配信
function loadURLWithSSR(filename: string, viewEngine: string = 'nunjucks') {
    const router: express.Router = express.Router()
    router.get('/', (req: express.Request, res: express.Response) => {
        let ext: string = ''
        if (viewEngine === 'nunjucks') {
            ext = 'njk'
        } else if (viewEngine === 'ejs') {
            ext = 'ejs'
        } else {
            // NotImplementedError(`Invalid view template engine. Given is ${viewEngine}.`)
            throw Error(`Invalid view template engine. Given is ${viewEngine}.`)
        }
        res.render(filename + `.${ext}`)
    })
    server.use('/', router)
}


/* ----------- Express API ----------- */

// テストAPI
server.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Electron Express!' });
});


// 包括的エラーハンドリング
server.use((err, req, res, next) => {

    /* 独自例外によるエラーハンドリング */
    // if (err instanceof MyError.BadRequest) {
    //     console.log('[BadRequest]', req)
    //     res.status(err.status).send(err.message)
    //     return
    // }

    // if (err instanceof MyError.NotFoundHTML) {
    //     console.log('[NotFoundHTML]', req)
    //     res.status(err.status).send('<html><body>Not Found!</body></html>')
    //     return
    // }

    // 例外キャッチできなかった場合の最終手段
    res.status(500).send('Internal Server Error')
    console.error('[Internal Server Error]', err)
})


/* ----------- Shutdown Settings ----------- */

async function terminate(){
    console.log("Terminate shutdown...")
    await httpTerminator?.terminate() ?? console.log(`HttpServerは起動していませんでした`)
    wsServer.stop()
    process.exit(1) // これ必要.
}

// Gracefull-Shutdown : SIGTERM
process.on('SIGTERM', () => {

    // Gracefull Shutdown開始
    console.log('Gracefull Shutdown...');

    // 新規リクエストの停止
    httpServer.close(() => {
        // 接続中のコネクションが全て終了したら実行される
        console.log(`Finish all requests`);
    });

    // タイムアウト30秒で強制終了
    const timer = setTimeout(async () => {
        // 強制終了
        await terminate()
    }, 30 * 1000)

    timer.unref()
});

// 強制終了 : SIGINT
process.on('SIGINT', async () => {
    console.log('Recieved SIGINT');
    await terminate()
});


/* ----------- Memory Checking ----------- */

// ヒープダンプを取得する関数
const createHeapDump = () => {
  // 保存先パス（Electronのユーザーデータ領域）
  const filePath = path.join(app.getPath('userData'), `heap-${Date.now()}.heapsnapshot`)
  
  // 標準機能でスナップショットを書き出し
  writeHeapSnapshot(filePath)
  
  console.log(`ヒープダンプが保存されました: ${filePath}`)
}

// 特定のタイミング（例えばipc通信やメニューバーのボタン）で実行
// ipcMain.handle('trigger-heapdump', createHeapDump);

// 2000ms毎にGCを実行
// setInterval(() => {
//     try {
//         global.gc();
//     } catch (e) {
//         console.log('use --expose-gc');
//         terminate();
//     }
//     const usedHeap = process.memoryUsage().heapUsed;
//     console.log(`Heap: ${usedHeap} bytes`);
// }, 2000);

// ヒープダンプ
process.on('SIGUSR2', () => {
    console.log('[START] heat dump!')
    createHeapDump() // ヒープダンプファイル(heapdump-xxxxx)を取得
    console.log('[END] heat dump!')
});

