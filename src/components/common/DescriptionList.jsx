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