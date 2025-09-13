import "./local.css"
import "../index.css"
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BossCell, Cell, CellId, CheckpointCell, EmptyCell, EndCell, Icon, LOOT_ITEMS, LootCell, Monster, MonsterCell, Player, PlayerIcon, Skill, StartCell, TitleCell } from "../constants"
import Grid from "../components/grid"
import M from "../assets/M.png"
import L from "../assets/L.png"
import C from "../assets/C.png"
import B from "../assets/B.png"
import Dice from "../components/dice"
import PlayerLabel from "../components/player_label"
import PlayerAdd from "../components/player_add"




createRoot(document.getElementById('root')!).render(

    <Local />

)


function Local() {
    const [players, setPlayers] = useState<Player[]>([
        // new Player({
        //     name: "Player 1", health: 10, magic: 2, strength: 2, agility: 2, inventory: [], id: "1", icon: Icon.M, currentCell: new CellId(0, 11)
        // }),
        // new Player({
        //     name: "Player 2", health: 10, magic: 2, strength: 2, agility: 2, inventory: [], id: "2", icon: Icon.L, currentCell: new CellId(0, 11)
        // }),
        // new Player({
        //     name: "Player 3", health: 10, magic: 2, strength: 2, agility: 2, inventory: [], id: "3", icon: Icon.C, currentCell: new CellId(0, 11)
        // }),
        // new Player({
        //     name: "Player 4", health: 10, magic: 2, strength: 2, agility: 2, inventory: [], id: "4", icon: Icon.B, currentCell: new CellId(0, 11)
        // }),
    ])



    const [grid, setGrid] = useState<Cell[][]>([[
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new LootCell(),
        new LootCell(),
        new MonsterCell(new Monster(Skill.Magic, 1)),
        new CheckpointCell(),
        new LootCell(),
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new LootCell(),

    ], [
        new MonsterCell(new Monster(Skill.Magic, 1)),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new TitleCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new MonsterCell(new Monster(Skill.Magic, 2)),
    ],
    [
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new MonsterCell(new Monster(Skill.Magic, 2)),
    ], [
        new LootCell(),
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new MonsterCell(new Monster(Skill.Magic, 3)),
        new LootCell(),
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new MonsterCell(new Monster(Skill.Magic, 3)),
        new MonsterCell(new Monster(Skill.Magic, 3)),
        new MonsterCell(new Monster(Skill.Magic, 3)),
    ], [
        new MonsterCell(new Monster(Skill.Magic, 1)),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new LootCell(),
    ], [
        new LootCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new MonsterCell(new Monster(Skill.Magic, 2)),
    ], [
        new MonsterCell(new Monster(Skill.Magic, 2)),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new LootCell(),
    ], [
        new MonsterCell(new Monster(Skill.Magic, 1)),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new LootCell(),
    ],
    [
        new MonsterCell(new Monster(Skill.Magic, 1)),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new MonsterCell(new Monster(Skill.Magic, 3)),
    ],
    [
        new LootCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new MonsterCell(new Monster(Skill.Magic, 3)),
    ],
    [
        new MonsterCell(new Monster(Skill.Magic, 1)),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new BossCell(new Monster(Skill.Magic, 5)),
    ], [
        new StartCell([]),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),
        new EmptyCell(),

        new EndCell(),
    ],])

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
    const [monsterFighting, setMonsterFighting] = useState<Monster | null>(null)
    const [firstFightingDiceRoll, setFirstFightingDiceRoll] = useState<number | null>(null)
    const [secondFightingDiceRoll, setSecondFightingDiceRoll] = useState<number | null>(null)
    const [addingPlayers, setAddingPlayers] = useState(true)


    function startGame() {
        const newGrid = [...grid]
        for (const player of players) {
            newGrid[player.currentCell.y][player.currentCell.x].playerIcons.push(new PlayerIcon(player.id, player.icon!))
        }
        setGrid([...newGrid])
    }

    // useEffect(() => {
    //     startGame()
    // }, [])

    function movePlayer(newCellId: CellId, allowCellInteraction: boolean = true) {
        const player = players[currentPlayerIndex]
        // Remove player icon from current cell
        const currentCell = grid[player.currentCell.y][player.currentCell.x]
        currentCell.playerIcons = currentCell.playerIcons.filter(icon => icon.playerId !== player.id)

        // Add player icon to new cell
        const newCell = grid[newCellId.y][newCellId.x]
        newCell.playerIcons.push(new PlayerIcon(player.id, player.icon!))

        // Update player's current cell
        player.currentCell = newCellId
        const newPlayers = [...players]
        newPlayers[currentPlayerIndex] = player
        setPlayers(newPlayers)

        // Update grid state to trigger re-render
        setGrid([...grid])
        setTimeout(() => {


            // Handle cell interaction
            if (newCell.type === 'Loot' && allowCellInteraction) {
                const lootCell = newCell as LootCell
                const lootItem = LOOT_ITEMS[Math.floor(Math.random() * LOOT_ITEMS.length)]
                player.inventory.push(lootItem)
                alert(`${player.name} found a ${lootItem}!`)
                setPlayers([...players])
                setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)


            } else if (newCell.type === 'Checkpoint' && allowCellInteraction) {
                player.checkpoint = new CellId(newCellId.x, newCellId.y)
                player.health += 2;
                alert(`${player.name} reached a checkpoint and gained 2 health!`)
                setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)

            } else if (newCell.type === 'Monster' && allowCellInteraction) {

                const monsterCell = newCell as MonsterCell
                const monster = monsterCell.monster
                if (monster.ignorePlayers.includes(player.id)) {

                    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)
                    return
                }
                //create a random monster skill
                const skills = Object.values(Skill)
                const monsterSkill = skills[Math.floor(Math.random() * skills.length)]
                monster.skill = monsterSkill
                alert(`${player.name} encountered a level ${monster.level} monster with ${monster.skill} skill!`)
                setMonsterFighting(monster);
            }

        }, 100)
    }
    // if (monsterFighting) {
    //                
    //                 return
    //             }
    useEffect(() => {
        if (firstFightingDiceRoll != null && secondFightingDiceRoll != null && monsterFighting) {
            const player = players[currentPlayerIndex]
            const modifier = monsterFighting.skill === Skill.Magic ? player.magic : monsterFighting.skill === Skill.Strength ? player.strength : player.agility;
            const playerTotal = firstFightingDiceRoll + secondFightingDiceRoll + modifier
            const monsterTotal = monsterFighting.level == 1 ? 7 : monsterFighting.level == 2 ? 9 : monsterFighting.level == 3 ? 10 : 12
            if (playerTotal >= monsterTotal) {
                alert(`${player.name} defeated the monster! (Player total: ${playerTotal} vs Monster total: ${monsterTotal})`)

            } else {
                player.health -= monsterFighting.level * 2
                alert(`${player.name} was defeated by the monster and lost ${monsterFighting.level * 2} health! (Player total: ${playerTotal} vs Monster total: ${monsterTotal})`)
                //Move the player back one cell
                if (player.health <= 0) {
                    alert(`${player.name} has been defeated!`)
                    if (player.checkpoint) {
                        alert(`${player.name} is returning to their checkpoint.`)
                        movePlayer(player.checkpoint, false)
                    } else {
                        alert(`${player.name} has no checkpoint and is returning to start.`)
                        movePlayer(new CellId(0, 11), false)
                    }
                } else {
                    let newCellId = new CellId(player.currentCell.x, player.currentCell.y + 1)
                    const roll = -1
                    if (player.currentCell.y == 3 && player.currentCell.x > 0) {
                        newCellId = new CellId(player.currentCell.x + roll, 3)
                        if (newCellId.x >= 8) newCellId = new CellId(8, player.currentCell.y + (newCellId.x - 8))

                    } else {

                        if (newCellId.y < 0) newCellId = new CellId(player.currentCell.x + (roll - player.currentCell.y), 0)
                        if (newCellId.x > 8) newCellId = new CellId(8, player.currentCell.y + (newCellId.x - 8))
                        if (newCellId.y < 0) newCellId = new CellId(8, 0)

                    }

                    movePlayer(newCellId, false)
                }
            }
            monsterFighting.ignorePlayers.push(player.id)
            setPlayers([...players])
            setGrid([...grid])
            setMonsterFighting(null)
            setFirstFightingDiceRoll(null)
            setSecondFightingDiceRoll(null)
            setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length)
        }
    }, [firstFightingDiceRoll, secondFightingDiceRoll, monsterFighting, players, currentPlayerIndex, grid])
    return (
        <div className="Local">
            {addingPlayers ? <>
                <div className="add-players">
                    <div className="Title">
                        <img src={M} alt="" />
                        <img src={L} alt="" />
                        <img src={C} alt="" />
                        <img src={B} alt="" />

                    </div>
                    <h2>Add Players</h2>
                    {players.map((player, index) =>
                        <PlayerAdd key={player.id} player={player} updatePlayer={(updatedPlayer) => {
                            const newPlayers = [...players]
                            newPlayers[index] = updatedPlayer
                            setPlayers(newPlayers)
                        }} />

                    )}
                    {players.length < 4 && <button onClick={() => {
                        const newPlayers = [...players]
                        const newId = (newPlayers.length + 1).toString()
                        let icon: Icon | null = null
                        if (newId === '1') icon = Icon.M
                        if (newId === '2') icon = Icon.L
                        if (newId === '3') icon = Icon.C
                        if (newId === '4') icon = Icon.B
                        newPlayers.push(new Player({
                            name: `Player ${newId}`, health: 16, magic: 0, strength: 0, agility: 0, inventory: [], id: newId, icon: icon, currentCell: new CellId(0, 11)
                        }))
                        setPlayers(newPlayers)
                    }}>Add Player</button>}
                    {players.length > 1 && <button className="start-game" onClick={() => {
                        if (players.some(p => !p.icon)) {
                            alert("All players must select an icon.")
                            return
                        }
                        setAddingPlayers(false)
                        startGame()
                    }}>Start Game</button>}
                </div>





            </> : <> <Grid currentPlayerId={players[currentPlayerIndex].id} cells={grid} onCellClick={(id) => {
                movePlayer(id)
            }} />
                {monsterFighting ?
                    <>
                        <Dice onRoll={(roll) => {
                            setFirstFightingDiceRoll(roll)

                        }} startRolling={() => { }} canRoll={firstFightingDiceRoll == null} />
                        <Dice onRoll={(roll) => {
                            setSecondFightingDiceRoll(roll)

                        }} startRolling={() => { }} canRoll={secondFightingDiceRoll == null} />

                    </>
                    :
                    <Dice onRoll={(roll) => {

                        roll = Math.ceil(roll / 2)
                        const player = players[currentPlayerIndex]
                        let newCellId = new CellId(player.currentCell.x, player.currentCell.y - (player.currentCell.x == 8 ? roll * -1 : roll))
                        let wouldPassShortcut = false
                        console.log("Current cell: ", player.currentCell.toString(), " Rolled: ", roll, " New cell: ", newCellId.toString())
                        if (player.currentCell.y >= 3 && player.currentCell.x == 0 && newCellId.y < 3) {
                            wouldPassShortcut = confirm("You rolled a " + roll + " and would pass the shortcut. Do you want to take the shortcut?")
                            console.log("Would pass shortcut")
                        }
                        if (wouldPassShortcut) {
                            newCellId = new CellId(roll - (player.currentCell.y - 3), 3)
                            console.log("Taking shortcut to: ", newCellId.toString())
                        }
                        if (player.currentCell.y == 3 && player.currentCell.x > 0) {
                            newCellId = new CellId(player.currentCell.x + roll, 3)
                            if (newCellId.x >= 8) newCellId = new CellId(8, player.currentCell.y + (newCellId.x - 8))

                        } else {

                            if (newCellId.y < 0) newCellId = new CellId(player.currentCell.x + (roll - player.currentCell.y), 0)
                            if (newCellId.x > 8) newCellId = new CellId(8, player.currentCell.y + (newCellId.x - 8))
                            if (newCellId.y < 0) newCellId = new CellId(8, 0)

                        }
                        if (player.currentCell.y == 0 && player.currentCell.x < 4 && newCellId.x > 4) {
                            const wantsToUseCheckpoint = confirm("You rolled a " + roll + " and would pass the checkpoint. Do you want to stop at the checkpoint?")
                            if (wantsToUseCheckpoint) {
                                newCellId = new CellId(4, 0)
                            }


                        }

                        movePlayer(newCellId)

                    }
                    } startRolling={() => {
                        // Optional: Add any logic needed when rolling starts
                    }} />}
                <div className="player-labels">
                    {players.map((player, index) => <PlayerLabel key={player.id} player={player} index={index} isCurrent={index === currentPlayerIndex} />)}
                </div></>
            }
        </div >
    )
}

export default Local