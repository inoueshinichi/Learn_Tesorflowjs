import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

import { createHashRouter, RouterProvider, useRouteError } from 'react-router-dom'


import { Locale } from './utils/locale'
import Clock from './components/Clock'
import OutlineLayout from './components/OutlineLayout'
import Home from './Home'
import Tensorflow from './TensorflowPage'
import OpenCV from './OpencvPage'
import Form from "./components/forms/Form"


function ErrorPage() {
  const error = useRouteError() as any // 発生したエラーを取得できる
  console.error(error)

  return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h1>おっと！エラーが発生しました。</h1>
      <p>{error.statusText || error.message}</p>
      <button onClick={() => window.location.hash = '/'}>ホームに戻る</button>
    </div>
  )
}


const electronRouter = createHashRouter([
  {
    path: '/',
    element: 
      // <OutlineLayout title="Tensorflow.js and OpenCV.js">
      //   <Clock locale={Locale.JP} />
      // </OutlineLayout>
      <OutlineLayout title="Tensorflow.js and OpenCV.js"></OutlineLayout>
    ,
    errorElement: <ErrorPage />
    ,
    children: [
      { 
        index: true, 
        element: <Home />,
      },
      {
        path: "tensorflow",
        element: <Tensorflow />
      },
      {
        path: "opencv",
        element: <OpenCV />
      },
      {
        path: "myform",
        element: <Form />
      },
    ]
  }
])

// function App(): React.JSX.Element {
//   return (
//     <div className="min-h-screen bg-slate-900 flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-sky-400 drop-shadow-md">
//         Electron + Tailwind CSS v4!
//       </h1>
//     </div>
//   )
// }

function App(): React.JSX.Element {
  return <RouterProvider router={electronRouter} />
}

// function App(): React.JSX.Element {
//   const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
//   return (
//     <>
//       <img alt="logo" className="logo" src={electronLogo} />
//       <div className="creator">Powered by electron-vite</div>
//       <div className="text">
//         Build an Electron app with <span className="react">React</span>
//         &nbsp;and <span className="ts">TypeScript</span>
//       </div>
//       <p className="tip">
//         Please try pressing <code>F12</code> to open the devTool
//       </p>
//       <div className="actions">
//         <div className="action">
//           <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
//             Documentation
//           </a>
//         </div>
//         <div className="action">
//           <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
//             Send IPC
//           </a>
//         </div>
//       </div>
//       <Versions></Versions>
//     </>
//   )
// }

export default App
