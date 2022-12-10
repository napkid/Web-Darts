import { useTranslation } from "../hooks/i18n"
import Button from "./Button"
import Modal from "./Modal"


const WinnerModal = props => {
    const {
        onRestart,
        onExit,
        text
    } = props

    const {
        t
    } = useTranslation()

    return <Modal onExit={onExit}>
        <h5 className="text-3xl font-semibold mb-8">
                {text}
            </h5>
            <div className="relative z-0 flex flex-wrap w-full space-y-4 sm:space-y-0">
                <div className="px-2 w-full sm:w-1/2">
                    <Button
                        size="small"
                        color="blue"
                        rounded
                        onClick={onRestart}
                    >
                        {t`restart`}
                    </Button>

                </div>
                <div className="px-2 w-full sm:w-1/2">
                    <Button
                        size="small"
                        color="gray"
                        rounded
                        onClick={onExit}
                    >
                        {t`exit`}
                    </Button>
                </div>

            </div>
    </Modal>
}

export default WinnerModal
