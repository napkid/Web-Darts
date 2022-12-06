import { useTranslation } from "../hooks/i18n"


const WinnerModal = props => {
    const {
        onRestart,
        onExit,
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
            <div className="flex flex-wrap w-full space-y-4 sm:space-y-0">
                <div className="px-2 w-full sm:w-1/2">
                    <button
                        className="bg-emerald-800 py-4 px-6 rounded-lg text-white font-semibold text-xl"
                        onClick={onRestart}
                    >
                        {t`restart`}
                    </button>

                </div>
                <div className="px-2 w-full sm:w-1/2">
                    <button
                        className="bg-gray-400 py-4 px-6 rounded-lg text-white font-semibold text-xl"
                        onClick={onRestart}
                    >
                        {t`exit`}
                    </button>
                </div>

            </div>
        </div>
        </div>
    </div>
}

export default WinnerModal
