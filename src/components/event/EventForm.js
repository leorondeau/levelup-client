import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = props => {

    const { games, getGames } = useContext(GameContext)
    const { events, getEvents, createEvent } = useContext(EventContext)
    const activeUser = localStorage.getItem("lu_token")
    console.log("activeUser" , activeUser)
    const [currentEvent, setCurrentEvent] = useState({

        gameId: 0,
        eventTime: "",
        location: "",
        
    })

    useEffect(() => {
        // Get all existing games from API
        getGames()
        
    }, [])

    /*The parameter <event> is inherited from the onChange event in the input field
    It is the way in which you can access all attributes in the input field. 
    Object.assign({}, source) creates a copy of an object and stores them in the empty object.
    
    ++handleControlledInputChange is acting as the event listener++
    */
    const handleControlledInputChange = (event) => {
        const newEventState = Object.assign({}, currentEvent)
        // event.target.name = key event.target.value = value
        // target is the dom element
        newEventState[event.target.name] = event.target.value
        setCurrentEvent(newEventState)
    }
    console.log("currentEvent", currentEvent)

    // You can put onChange or onClick events anywhere for ex. in a <div>

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={currentEvent.gameId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventTime">Time: </label>
                    <input type="datetime-local" name="eventTime" required autoFocus className="form-control"
                        value={currentEvent.eventTime}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentEvent.location}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit" className="btn"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        
                        gameId: parseInt(currentEvent.gameId),
                        eventTime: currentEvent.eventTime,
                        location: currentEvent.location,
                        
                    }
                    createEvent(event)
                    .then(() => props.history.push("/events"))
                    
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
