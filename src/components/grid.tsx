
import { CellId, type Cell } from "../constants"
import "./grid.css"

import CellComponent from "./cell"

type GridProps = {


    cells: Cell[][],
    onCellClick: (cellId: CellId) => void;
    currentPlayerId: string;
}

function Grid({ cells, onCellClick, currentPlayerId }: GridProps) {




    return (
        <div className={`grid`} >
            {cells.map((row, r) => <div className="row">
                {row.map((cell, c) => <CellComponent currentPlayerId={currentPlayerId} cell={cell} cellId={new CellId(r, c)} onClick={onCellClick} />)}
            </div>
            )}

        </div>
    )
}

export default Grid