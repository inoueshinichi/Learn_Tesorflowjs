import { WebSocketServer, WebSocket } from 'ws'


export class SocketServer {
  private wss: WebSocketServer | null = null

  constructor(private port: number) {}

  // サーバーを開始するメソッド
  public start() {
    if (this.wss) return

    this.wss = new WebSocketServer({ port: this.port })
    console.log(`WebSocket Server started on port ${this.port}`)

    this.wss.on('connection', (ws: WebSocket) => {
      this.handleConnection(ws)
    });
  }

  // 接続時のロジック（ここを分離することで見通しが良くなる）
  private handleConnection(ws: WebSocket) {
    ws.on('message', (message) => {
      console.log('Received:', message.toString())
      ws.send(`Echo: ${message}`)
    })

    ws.send('Connected to Electron Main Process')
  }

  // サーバーを停止するメソッド（アプリ終了時などに呼ぶ）
  public stop() {
    this.wss?.close(() => {
      console.log('WebSocket Server stopped')
      this.wss = null
    });
  }
}