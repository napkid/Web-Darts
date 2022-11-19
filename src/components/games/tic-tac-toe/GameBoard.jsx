import React from 'react'

const Cross = props => {
    const {
        x,
        y,
        width,
        height
    } = props
    return <use
        width={width}
        height={height}
        xlinkHref="#cross"
        x={x} y={y}
    />
}

const Circle = props => {
    const {
        x,
        y,
        width,
        height
    } = props
    return <use width={width} height={height} xlinkHref="#circle" x={x} y={y} />
}

const strokeClass = 'stroke-emerald-800'

const Grid = props => {
    return <>
        <line x1="16" x2="16" y1="1" y2="47" className={strokeClass} style={{
            strokeWidth: 1,
        }} />
        <line x1="32" x2="32" y1="1" y2="47" className={strokeClass} style={{
            strokeWidth: 1,
        }} />

        <line y1="16" y2="16" x1="1" x2="47" className={strokeClass} style={{
            strokeWidth: 1,
        }} />
        <line y1="32" y2="32" x1="1" x2="47" className={strokeClass} style={{
            strokeWidth: 1,
        }} />
    </>
}


const GameBoard = props => {
    const {
        state
    } = props
    const step = 16
    const smallSymbolSize = step/2

    return <div className="bg-emerald-600 p-4 rounded-lg">
        <svg strokeLinecap="round" className="w-full h-full" viewBox="0 0 48 48" >
            <symbol id="cross" viewBox="0 0 16 16" className="stroke-emerald-800">
                <line x1="2" x2="14" y1="2" y2="14" style={{
                        strokeWidth: 1
                    }} />
                <line x1="14" x2="2" y1="2" y2="14" style={{
                    strokeWidth: 1
                }} />
            </symbol>

            <symbol id="circle" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6" className="stroke-emerald-800" strokeWidth="1" fill="none" />
            </symbol>


            <Grid />
            {state.map((row, rowIdx) => row.map((box, boxIdx) => {
                return <>
                    <text
                        x={(boxIdx)*step+step/2}
                        y={(rowIdx)*step+step/2}
                        dominantBaseline="central"
                        textAnchor="middle"
                        className="text-sm fill-white"
                    >
                        {box.value}
                    </text>
                    {box.shots.circle >= 3 || box.shots.cross >= 3
                        /* Big display */
                        ? box.shots.circle >= 3
                            ? <Circle x={boxIdx*step} y={rowIdx*step} width={16} height={16} />
                            : <Cross x={boxIdx*step} y={rowIdx*step} width={16} height={16} />
                        /* Small displays */
                        : [
                            Array(box.shots.circle).fill(null).map((c, idx) => <Circle
                                x={boxIdx*step} y={idx*smallSymbolSize+rowIdx*step} width={smallSymbolSize} height={smallSymbolSize} />
                            ),
                            Array(box.shots.cross).fill(null).map((c, idx) => <Cross
                                x={smallSymbolSize+boxIdx*step} y={idx*smallSymbolSize+rowIdx*step} width={smallSymbolSize} height={smallSymbolSize} />
                            )
                        ]
                    }

                    
                </>
            }))}
        </svg>
    </div>
}

export default GameBoard
