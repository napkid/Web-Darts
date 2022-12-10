

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
