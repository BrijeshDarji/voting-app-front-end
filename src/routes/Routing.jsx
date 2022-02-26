import React, { Suspense } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom"

import LoadingFallback from "./LoadingFallback.jsx"
import Login from "../components/login/Login.jsx"
import SignUp from "../components/signup/SignUp.jsx"
import PrivateRoute from "./PrivateRoute.jsx"

import { RouteList } from "./RouteList.js"
import { URL_LOGIN, URL_SIGN_UP } from "../helpers/SitePath.js"

function Routing() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route exact path={"/"} element={<Login />} />
                    <Route exact path={URL_LOGIN} element={<Login />} />
                    <Route exact path={URL_SIGN_UP} element={<SignUp />} />
                    {
                        RouteList.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    element={<PrivateRoute Component={route.component} />}
                                />
                            )
                        })
                    }
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Routing
