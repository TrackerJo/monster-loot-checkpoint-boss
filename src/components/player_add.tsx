import { Icon, type Player } from "../constants"
import "./player_add.css"

type PlayerAddProps = {
    player: Player;
    updatePlayer: (player: Player) => void;
}

function PlayerAdd({ player, updatePlayer }: PlayerAddProps) {
    return (
        <div className={`player-add`}>
            <div className="player-basic-info">
                <input type="text" value={player.name} onChange={(e) => {
                    updatePlayer({ ...player, name: e.target.value })
                }} placeholder="Player Name" />

                <div className="stat">
                    <label>Health: </label>
                    <label htmlFor="">{player.health}</label>

                </div>
            </div>
            <div className="player-stats">

                <div className="stat">
                    <label>Strength:</label>
                    <label htmlFor="">{player.strength}</label>
                    <div className="stat-buttons">
                        <button onClick={() => {
                            if (player.strength > 0) updatePlayer({ ...player, strength: player.strength - 1, health: player.health + 1 })
                        }}>-</button>
                        {player.health > 1 && <button onClick={() => {
                            updatePlayer({ ...player, strength: player.strength + 1, health: player.health - 1 })
                        }}>+</button>}
                    </div>
                </div>
                <div className="stat">
                    <label>Agility:</label>
                    <label htmlFor="">{player.agility}</label>
                    <div className="stat-buttons">
                        <button onClick={() => {
                            if (player.agility > 0) updatePlayer({ ...player, agility: player.agility - 1, health: player.health + 1 })
                        }}>-</button>
                        {player.health > 1 && <button onClick={() => {
                            updatePlayer({ ...player, agility: player.agility + 1, health: player.health - 1 })
                        }}>+</button>}
                    </div>
                </div>
                <div className="stat">
                    <label>Magic:</label>
                    <label htmlFor="">{player.magic}</label>
                    <div className="stat-buttons">
                        <button onClick={() => {
                            if (player.magic > 0) updatePlayer({ ...player, magic: player.magic - 1, health: player.health + 1 })
                        }}>-</button>
                        {player.health > 1 && <button onClick={() => {
                            updatePlayer({ ...player, magic: player.magic + 1, health: player.health - 1 })
                        }}>+</button>}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default PlayerAdd