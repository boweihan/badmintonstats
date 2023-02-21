import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Navbar from '@/layout/Navbar'
import Home from '@/screens/Home'
import Group from '@/screens/Group'
import NotFound from '@/screens/NotFound'
import ScreenLogin from '@/screens/auth/Login'
import ScreenJoin from '@/screens/auth/Join'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container flex-grow p-4 mx-auto">
        <QueryClientProvider client={queryClient}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/group/:id">
              <Group />
            </Route>
            <Route path="/login">
              <ScreenLogin />
            </Route>
            <Route path="/join">
              <ScreenJoin />
            </Route>
            <Route component={NotFound} />
          </Switch>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </main>
    </>
  )
}

export default App
