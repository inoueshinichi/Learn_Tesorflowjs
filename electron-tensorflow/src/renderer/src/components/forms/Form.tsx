import {
    useState,
    useContext,
    createContext,
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

import TextInput from "./TextInput"
import URLInput from "./URLInput"
import EmailInput from "./EmailInput"


export type InputProps = {
    label: string;
    name: string;
    type?: string;
    validate: (value: any) => boolean; // 親からバリデーションルールを受け取る
    onReport: (name: string, value: any, isValid: boolean) => void; // 親への報告用
}

export type FormInputNames = {
    username: string;
    email: string;
}

function Form(): React.JSX.Element {
    // 各Input項目の状態
    const [formData, setFormData] = useState<FormInputNames>({
        username: '',
        email: '',
    })

    // 各Input項目の「有効状態」を管理するState
    const [validityMap, setValidityMap] = useState<Record<string, boolean>>({})

    // 子からの報告を受け取る関数
    const handleReport = (name: string, value: any, isValid: boolean) => {
        // Input値を更新
        setFormData(prev => ({ ...prev, [name]: value }))

        // バリデーション結果を更新
        setValidityMap((prev) => ({ ...prev, [name]: isValid }))

        // 必要ならここで値を別途保存する
        console.log(`${name} の値は ${value}`)
    }

    // 全ての項目がtrueならボタンを有効化
    const isAllValid = Object.values(validityMap).every(v => v === true)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
        e.preventDefault()
        console.log('送信データ:', formData)
    }

    // No ASCIIパターン
    const noAsciiFilter: RegExp = /[^\u0020-\u007e]+/g
    // URLパターン
    const urlPattern: RegExp = /^https?(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/
    // EMailパターン
    const emailPattern: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label="ユーザー名"
                name="username"
                validate={(val) => !noAsciiFilter.test(val) && val.length <= 20}
                onReport={handleReport}
            />
            <URLInput
                label="URL"
                name="url"
                validate={(val) => urlPattern.test(val)}
                onReport={handleReport}
            />
            <EmailInput
                label="メール"
                name="email"
                validate={(val) => emailPattern.test(val)}
                onReport={handleReport}
            />
            <button type='submit' value='送信' disabled={!isAllValid} />
        </form>
    )
}

export default Form