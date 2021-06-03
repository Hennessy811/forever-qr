import React from "react"

import { BrowserRouter, Route, Switch } from "react-router-dom"

import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Opener from "./pages/Opener"
import Layout from "./shared/layout"
import AuthIsLoaded from "./shared/layout/AuthIsLoaded"
import PrivateRoute from "./shared/layout/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <Switch>
          <PrivateRoute path="/" exact>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
          <Route path="/login">
            <Auth />
          </Route>
          <Route path="/project/:id">
            <Opener />
          </Route>
          <PrivateRoute path="/protected">
            <div>Protected content</div>
          </PrivateRoute>
        </Switch>
      </AuthIsLoaded>
    </BrowserRouter>
  )
}

export default App
