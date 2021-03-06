import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./event/EventProvider.js"
import { EventList } from './event/EventList.js'
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from './game/GameForm'
import { EventForm } from './event/EventForm'
import { ProfileProvider } from './auth/ProfileProvider'
import { Profile } from './auth/Profile'


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <EventProvider>
                    <Route exact path="/games" render={(props) => {
                        return <GameList {...props} />
                    }}>
                    </Route>
                </EventProvider>
                    <Route exact path="/games/new" render={(props) => {
                        return <GameForm {...props} />
                    }} />
                    <Route exact path="/games/:gameId(\d+)/edit" render={(props) => {
                        return <GameForm {...props} />
                    }} />
            </GameProvider>
            <GameProvider>
                <EventProvider>
                    <Route exact path="/" render={(props) => {
                        return <GameList {...props} />
                    }}>
                    </Route>
                    <Route exact path="/events" render={(props) => {
                        return <EventList {...props} />
                    }} />
                    <Route exact path="/events/new" render={(props) => {
                        return <EventForm {...props} />
                    }} />
                </EventProvider>
            </GameProvider>

            <ProfileProvider>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </ProfileProvider>

        </main>
    </>
}

