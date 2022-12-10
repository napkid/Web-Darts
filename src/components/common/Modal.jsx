// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

const Modal = props => {

    const {
        children,
        onExit
    } = props

    return <div className="fixed z-50 top-0 left-0 w-full h-full">
        <div  className="absolute top-0 left-0 h-full w-full opacity-60 bg-black">
        </div>
        <div onClick={() => onExit()} className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            
            <div onClick={e => e.stopPropagation()} className="bg-emerald-600 border-emerald-800 shadow-xl w-2/3 rounded-lg py-8 px-4 text-center text-white">
                {children}
            </div>
        </div>
    </div>
}

export default Modal
