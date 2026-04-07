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

import { Locale } from "@renderer/utils/locale"


function Clock({ locale }: { locale:Locale }): React.JSX.Element {
    const [timestamp, setTimestamp] = useState<Date>(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimestamp(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <div>
            <p>{timestamp.toLocaleDateString(locale)}</p>
        </div>
    )
}


export default Clock