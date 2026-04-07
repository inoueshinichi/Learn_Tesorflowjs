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

import Versions from "./Versions"

function Home(): React.JSX.Element {
    return (
        <React.Fragment>
            <div className="home-">
                <ul className="home-list">
                    <li><Link to="/tensorflow">Tensorflow.js</Link></li>
                    <li><NavLink to="/opencv">OpenCV.js</NavLink></li>
                </ul>
            </div>
            <div>
                <Versions></Versions>
            </div>
        </React.Fragment>
    )
}


export default Home