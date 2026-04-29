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


function OpencvPage(): React.JSX.Element {
    return (
        <>
            <div>
                <header>
                    <h1>OpenCV</h1>
                </header>
                <div>
                    <ul>
                        <li>opencv</li>
                        <li><Link to="/">ホームに戻る</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default OpencvPage