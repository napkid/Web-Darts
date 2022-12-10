// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import clsx from 'clsx'
import { blockStyle } from '../../style'


const DescriptionList = props => {
    const {
        items
    } = props

    return <div className="relative z-0">
        <dl className={clsx(
            'divide-y divide-emerald-800 text-center bg-emerald-600 rounded-lg shadow-lg mb-4 text-xl',
            blockStyle.base,
            blockStyle.rounded,
            blockStyle.colors.green
        )}>
            {items.map(item => <div key={item.title} className="py-4 text-white grid grid-cols-2 gap-4">
                <dt className="uppercase font-semibold text-gray-300">
                    {item.title}
                </dt>
                <dd>
                    {item.description}
                </dd>
            </div>)}
        </dl>
    </div>
}

export default DescriptionList