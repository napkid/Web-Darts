import { useTranslation } from "../config/i18n"


const WinnerModal = props => {
    const {
        onRestart,
        text
    } = props

    const {
        t
    } = useTranslation()

    return <div className="fixed top-0 left-0 w-full h-full">
        <div className="absolute z-40 top-0 left-0 h-full w-full opacity-50 bg-emerald-900">
        </div>
        <div className="absolute z-50 top-0 left-0 w-full h-full flex justify-center items-center">
            
        <div className="bg-emerald-600 border-emerald-800 shadow-xl w-2/3 rounded-lg py-8 px-4 text-center text-white">

            <h5 className="text-3xl font-semibold mb-8">
                {text}
            </h5>
            <button
                className="bg-emerald-800 py-4 px-6 rounded-lg text-white font-semibold text-xl"
                onClick={onRestart}
            >
                {t`restart`}
            </button>
        </div>
        </div>
    </div>
}

export default WinnerModal
