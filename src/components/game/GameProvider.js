import React, { useState } from 'react'

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [games, setGames] = useState([])
    const [gameTypes, setGameTypes] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(setGames)
    }

    const editGame = (game) => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(getGames)
    }

    const getGameTypes = () => {
        return fetch("http://localhost:8000/gametypes", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGameTypes)
    }

    const getGame = (id) => {
        
        return fetch(`http://localhost:8000/games/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            
            }
        })
            .then(response => response.json())
            
        }

    return (
        <GameContext.Provider value={{
            games, getGames, gameTypes,
            getGame, editGame, setGameTypes, getGameTypes, createGame
        }}>
            { props.children}
        </GameContext.Provider>
    )
}
