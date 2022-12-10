// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import Button from '../../common/Button'


const DartButton = props => {
    const {
        onClick,
        active,
        disabled
    } = props

    return <div className="absolute bottom-0 right-0 mb-4 mr-4">
        <Button
            disabled={disabled}
            onClick={onClick}
            pill
            color="red"
            className="flex justify-center items-center h-16 w-16"
        >

            <svg
            className="text-white w-8 h-8"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M131.944 193.633s-10.886.945-7.63 9.371h-.001l-8.479 6.26a2.866 2.889 45 0 0-.696.513l4.054 4.054a2.866 2.889 45 0 0 .514-.696l6.26-8.479h-.001c8.426 3.255 9.37-7.63 9.37-7.63h-3.391zm-17.156 16.495a2.866 2.889 45 0 0-.536 3.353l-.002-.003s-3.15 3.42-2.9 4.14c.721.251 4.141-2.9 4.141-2.9l-.002-.002a2.866 2.889 45 0 0 3.353-.536z" transform="translate(-111.336 -193.633)" />
            </svg>
        </Button>
    </div>
}

export default DartButton
