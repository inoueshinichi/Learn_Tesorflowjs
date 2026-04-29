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

import { cn } from '../../utils/cn'
import { InputProps } from './Form'

function EmailInput({
    label, name, type='email', validate, onReport
}: InputProps): React.JSX.Element {
    const [value, setValue] = useState<string>('')
    const [isDirty, setIsDirty] = useState<boolean>(false) // 一度でも入力したか

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'number' ? Number(e.target.value) : e.target.value
        setValue(e.target.value)
        setIsDirty(true)

        // 自分のバリデーションを実行
        const isValid = validate(newValue)

        // 親に「値」と「判定結果」を報告
        onReport(name, newValue, isValid)
    }

    const isValid = validate(type === 'number' ? Number(value) : value)

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} value={value} onChange={handleChange} />
            {isDirty && !isValid && (
                <span className={cn("text-red-500", "text-xs")}>
                    入力が正しくありません
                </span>
            )}
        </div>
    )
}

export default EmailInput
