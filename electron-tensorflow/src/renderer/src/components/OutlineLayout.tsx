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

import React, { ReactNode } from 'react'
import { Outlet } from "react-router-dom"

import Clock from './Clock'
import { Locale } from "@renderer/utils/locale"

import Versions from "./Versions"

interface OutlineLayoutProps {
    children?: ReactNode;
    title: string;   
}


function OutlineLayout(props: OutlineLayoutProps): React.JSX.Element {
    const { children, title } = props

    return (
        <div className="outline-layout">
            <header className="outline-header">
                <h3 className="outline-title">{title}</h3>
            </header>
            <main className="outline-main">
                {children && children}
                <Outlet />
            </main>
            <footer className="outline-footer">
                <p>© 2026 Powered by TinyTank</p>
            </footer>
            <Versions></Versions>
        </div>
    )
}


export default OutlineLayout

