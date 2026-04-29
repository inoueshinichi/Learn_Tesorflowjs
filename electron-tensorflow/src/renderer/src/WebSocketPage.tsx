import {
    useState,
    useContext,
    useReducer,
    useEffect,
    useLayoutEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
    useTransition,
    useMemo,
    useCallback,
    memo,
    useId,
    useDeferredValue,
    useDebugValue,
    useSyncExternalStore,
    useActionState,
    useInsertionEffect,
    useOptimistic
} from "react"

import {
    Link, NavLink, useParams
} from 'react-router-dom'

import React, { Suspense, lazy } from 'react'


function WebSocketPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // メインプロセスへ接続
    const ws = new WebSocket('ws://localhost:8080')

    ws.onopen = () => console.log('Connected to Main Process')
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }

    setSocket(ws);

    return () => ws.close(); // クリーンアップ
  }, [])

  const sendMessage = () => {
    socket?.send('こんにちは、メインプロセス！')
  }

  return (
    <div>
      <button onClick={sendMessage}>送信</button>
      <ul>
        {messages.map((m, i) => <li key={i}>{m}</li>)}
      </ul>
    </div>
  )
}

export default WebSocketPage

