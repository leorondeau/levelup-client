import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider.js"
import { Link } from "react-router-dom"

export const EventList = (props) => {
    const { events, getEvents, joinEvent } = useContext(EventContext)

    useEffect(() => {
        getEvents()
        
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    props.history.push({ pathname: "/events/new" })
                }}
            >Schedule New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.game.description}</div>
                        <div>{event.location}</div>
                        <div>
                            {
                                new Date(event.event_time).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'                                
                                
                                })
                            }                          
                        </div>
                        <button className="btn btn-2"
                                onClick={() => joinEvent(event.id)}
                        >Join</button>
                    </section>
                })
            }
        </article >
    )
}