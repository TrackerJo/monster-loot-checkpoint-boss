import type { Player } from "../constants"
import "./player_label.css"
import M from '../assets/M.png'
import L from '../assets/L.png'
import C from '../assets/C.png'
import B from '../assets/B.png'

type PlayerLabelProps = {
    player: Player;
    isCurrent: boolean;
    index: number;
}

function PlayerLabel({ player, isCurrent, index }: PlayerLabelProps) {
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
        <div className={`player-label ${isCurrent ? "current-player" : ""} player-${index}`}>
            <img className="player-label-icon" src={getPlayerIcon(player.icon || '')} alt="" />
            <div className="player-label-info">
                <div className="player-label-name">{player.name}</div>
                <div className="player-label-stats">
                    <div>HP: {player.health}</div>
                    <div>STR: {player.strength}</div>
                    <div>AGI: {player.agility}</div>
                    <div>MAG: {player.magic}</div>
                </div>
                <div className="player-label-inventory">
                    Inventory: {player.inventory.length === 0 ? "Empty" : player.inventory.join(", ")}
                </div>
            </div>
        </div>
    )
}

export default PlayerLabel