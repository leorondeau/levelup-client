import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"


export const GameForm = props => {
    const { createGame, getGameTypes, gameTypes, getGame, editGame } = useContext(GameContext)
    const [currentGame, setCurrentGame] = useState({

        numberOfPlayers: 0,
        title: "",
        description: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    // console.log("" , gameId in props.match.params)
    useEffect(() => {
        
        if ("gameId" in props.match.params) {
            getGame(props.match.params.gameId).then(game => {
                console.log(game)
                setCurrentGame({
                    numberOfPlayers: game.numberOfPlayers,
                    title: game.title,
                    description: game.description,
                    gameTypeId: game.gameTypeId
                })
                
            })
        }
    }, [props.match.params.gameId])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }
    
    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select type="dropdown" name="gameTypeId" required autoFocus className="form-control"
                        onChange={handleControlledInputChange}
                    >
                        <option value="" disabled selected>Select your option</option>
                        {gameTypes.map(gt => <option key={gt.id} value={gt.id}>{gt.label}</option>)} </select>

                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}
            {
                ("gameId" in props.match.params)
                    ? <button 
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            editGame({
                                id: props.match.params.gameId, 
                                title: currentGame.title,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                description: currentGame.description,
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            })
                            .then(() => props.history.push("/games"))
                        }}
                        className="btn btn-primary">Edit</button>
                    : <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const game = {

                                title: currentGame.title,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                description: currentGame.description,
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }

                            // Send POST request to your API
                            createGame(game)
                            .then(() => props.history.push("/"))
                        }}
                        className="btn btn-primary">Create</button>
            }

        </form>
    )
}