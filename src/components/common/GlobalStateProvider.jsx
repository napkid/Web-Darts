// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { GlobalContext } from "../../hooks/useGlobalState"
import useAppState from "../../state"

const GlobalStateProvider = props => {
    const {
        children
    } = props

    const [state, dispatch] = useAppState()

    return <GlobalContext.Provider value={[state, dispatch]}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalStateProvider
