

const DartButton = props => {
    const {
        onClick,
        active,
        disabled
    } = props

    return <button
        className="absolute bottom-0 right-0 mr-4 mb-4 shadow-lg flex justify-center items-center h-16 w-16 bg-emerald-500 hover:bg-emerald-600 rounded-full text-white font-semibold"
        disabled={disabled}
        onClick={onClick}
    >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
            </svg>

    </button>
}

export default DartButton
