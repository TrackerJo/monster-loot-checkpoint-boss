
import { BossCell, Cell, CellId, MonsterCell } from "../constants";
import "./cell.css";
import M from '../assets/M.png'
import L from '../assets/L.png'
import C from '../assets/C.png'
import B from '../assets/B.png'


type CellProps = {
    cell: Cell;
    cellId: CellId;
    currentPlayerId: string;
    onClick: (cellId: CellId) => void;
}

function CellComponent({ cell, onClick, cellId, currentPlayerId }: CellProps) {

    function getPlayerIcon(iconType: string) {
        switch (iconType) {
            case 'M':
                return M;
            case 'L':
                return L;
            case 'C':
                return C;
            case 'B':
                return B;
            default:
                return '';
        }
    }
    return (
        <div className={`cell ${cell.type.toString().toLowerCase()}-cell`} onClick={() => onClick(cellId)}>
            {cell.type === 'Monster' && !(cell as MonsterCell).monster.ignorePlayers.includes(currentPlayerId) ? "Lvl. " + (cell as MonsterCell).monster.level : cell.type === 'Boss' ? "Lvl. " + (cell as BossCell).boss.level : ""}
            <div className="player-icons">
                {cell.playerIcons.map((icon) => <img className="player-icon" src={getPlayerIcon(icon.icon)} alt="" />)}

            </div>
            {cell.type === "Title" && <div className="title">
                <img src={M} alt="" />
                <img src={L} alt="" />
                <img src={C} alt="" />
                <img src={B} alt="" />

            </div>}
        </div>
    )
}

export default CellComponent;