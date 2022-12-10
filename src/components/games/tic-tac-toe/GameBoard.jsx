// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 


const GameSymbol = props => {
    const {
        x,
        y,
        width,
        height,
        symbol
    } = props

    return <use
        width={width}
        height={height}
        xlinkHref={`#${symbol}`}
        x={x} y={y}
    />
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
        teams,
        state
    } = props
    const step = 16
    const smallSymbolSize = step/teams.length

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

            <symbol id="triangle" viewBox="0 0 16 16" className="stroke-emerald-800">
                <polygon points="2,14 8,2 14,14" style={{
                    fill: 'none',
                    strokeWidth: 1
                }} />
            </symbol>

            <symbol id="circle" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6" className="stroke-emerald-800" strokeWidth="1" fill="none" />
            </symbol>


            <Grid />
            {state.map((row, rowIdx) => row.map((box, boxIdx) => {
                return <g key={""+rowIdx+boxIdx}>
                    <text
                        x={(boxIdx)*step+step/2}
                        y={(rowIdx)*step+step/2}
                        dominantBaseline="central"
                        textAnchor="middle"
                        className="text-xs fill-white"
                    >
                        {box.value}
                    </text>
                    {box.owner
                        /* Big display */
                        ? <GameSymbol symbol={box.owner} x={boxIdx*step} y={rowIdx*step} width={16} height={16} />
                        /* Small displays */
                        : teams.map((t, tIdx) => Array(box.shots[t.id]||0)
                            .fill(null)
                            .map((c, idx) => <GameSymbol
                                symbol={t.id}
                                x={tIdx*smallSymbolSize+boxIdx*step}
                                y={idx*smallSymbolSize+rowIdx*step}
                                width={smallSymbolSize}
                                height={smallSymbolSize}
                            />)
                        )
                    }

                    
                </g>
            }))}
        </svg>
    </div>
}

export default GameBoard
