import { useState } from "preact/hooks"
import { useTranslation } from "../../../hooks/i18n"
import DartKeyboard from "../../DartKeyboard"


const StartNumberPicker = props => {

    const {
        onPick
    } = props

    const { t } = useTranslation()

    const handlePick = n => {
        onPick(n.shots[0])
    }

    const [keyboardOpen, setKeyboardOpen] = useState(false)

    return <div className="h-full flex justify-center items-center">
        <button
            onClick={() => setKeyboardOpen(!keyboardOpen)}
            className="px-6 py-6 rounded-full bg-emerald-500 border border-emerald-800 hover:bg-emerald-500 shadow text-white font-semibold uppercase text-2xl">
            {t`pick-start-number`}
        </button>

        <DartKeyboard
            open={keyboardOpen}
            onSubmit={handlePick}
            onExit={() => setKeyboardOpen(false)}
        />
    </div>
}

export default StartNumberPicker
