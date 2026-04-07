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

// emotion-style
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Clock from './Clock'
import { Locale } from "@renderer/utils/locale"



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
        </div>
    )
}


export default OutlineLayout

