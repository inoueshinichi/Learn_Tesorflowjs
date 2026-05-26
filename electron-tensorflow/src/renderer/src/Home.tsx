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



function Home(): React.JSX.Element {
    return (
        <React.Fragment>
            <div className="home">
                <ul className="home-list">
                    <li><Link to="/tensorflow">Tensorflow.js</Link></li>
                    <li><NavLink to="/opencv">OpenCV.js</NavLink></li>
                    <li><NavLink to="/myform">My Form</NavLink></li>
                    <li><NavLink to="/firebase">Firebase</NavLink></li>
                </ul>
            </div>
        </React.Fragment>
    )
}


export default Home