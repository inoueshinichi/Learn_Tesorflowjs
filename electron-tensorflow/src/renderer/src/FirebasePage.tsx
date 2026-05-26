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


import { initializeApp } from 'firebase/app'
import { FirebaseUIStore, initializeUI } from '@firebase-oss/ui-core'
// @import "@firebase-oss/ui-styles/tailwind"
import { FirebaseUIProvider } from '@firebase-oss/ui-react'
import { SignInAuthScreen } from '@firebase-oss/ui-react'

// const app: FirebaseApp = initializeApp({ ... })

// const ui: FirebaseUIStore = initializeUI({
//   app,
// })


function FirebasePage () {
    // return (
    //     <FirebaseUIProvider ui={ui}>
    //         <>
    //             <header>Welcome</header>
    //             <SignInAuthScreen onSignIn={() => { ... }} />
    //         </>
    //     </FirebaseUIProvider>
    // )


    return (
        <>
            <div>
                <header>
                    <h1>This page is Firebase social login</h1>
                </header>
                <div>
                    <ul>
                        <li>Firebase</li>
                        <li><Link to="/">ホームに戻る</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default FirebasePage