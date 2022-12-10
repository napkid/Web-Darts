// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useState } from 'preact/hooks'

import useTranslation from '../../../hooks/i18n'
import Button from '../../common/Button'
import DartKeyboard from '../common/DartKeyboard'


const StartNumberPicker = props => {

    const {
        onPick
    } = props

    const { t } = useTranslation()

    const handlePick = n => {
        onPick(n.shots[0])
    }

    const [keyboardOpen, setKeyboardOpen] = useState(false)

    return <div className="text-center relative h-full flex flex-col space-y-8 justify-center items-center">
        <h1 className="text-5xl">
            {t`start-number`}
        </h1>
        
        <Button
            pill
            size="big"
            color="green"
            onClick={() => setKeyboardOpen(!keyboardOpen)}>
            {t`pick-start-number`}
        </Button>

        <Button
            pill
            size="big"
            color="red"
            onClick={() => onPick(1+Math.round(Math.random()*19))}>
                <div className="flex">
                    <svg viewBox="0 0 24 24"  className="mr-2 w-10 h-10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="media-player" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="random" fill="currentColor">
                                <path d="M4,17 C3.44771525,17 3,16.5522847 3,16 C3,15.4477153 3.44771525,15 4,15 L6,15 L9,12 L6,9 L4,9 C3.45000005,9 3,8.55245148 3,8.00122564 C3,7.44999981 3.45000005,7 4,7 L7,7 L11,11 L15,7 L17,7 L17,5 L21,8.00122564 L17,11 L17,9 L16,9 L13,12 L16,15 L17,15 L17,13 L21,16 L17,19 L17,17 L15,17 L11,13 L7,17 L4,17 Z" id="Shape"></path>
                            </g>
                        </g>
                    </svg>
                    {t`random`}
                </div>
        </Button>

        <DartKeyboard
            dartCount={1}
            disallowEmpty
            open={keyboardOpen}
            onSubmit={handlePick}
            onExit={() => setKeyboardOpen(false)}
        />
    </div>
}

export default StartNumberPicker
