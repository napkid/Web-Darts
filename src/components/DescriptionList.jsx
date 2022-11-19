

const DescriptionList = props => {
    const {
        items
    } = props

    return <dl className="divide-y divide-emerald-800 text-center bg-emerald-600 rounded-lg shadow-lg mb-4 text-xl">
        {items.map(item => <div className="py-4 text-white grid grid-cols-2 gap-4">
            <dt className="uppercase font-semibold">
                {item.title}
            </dt>
            <dd>
                {item.description}
            </dd>
        </div>)}
    </dl>
}

export default DescriptionList