// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import useTranslation from "../../../hooks/i18n"
import Button from "../../common/Button"
import Modal from "../../common/Modal"


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
