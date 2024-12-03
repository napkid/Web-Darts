// This file is part of WebDarts.
// WebDarts is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// WebDarts is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
// You should have received a copy of the GNU Affero General Public License along with WebDarts. If not, see <https://www.gnu.org/licenses/>. 

import { useRef } from 'preact/hooks'
import { Link, Route, Switch } from 'wouter'
import { ScrollContext } from '../hooks/useDraggable.js'

import Background from './common/Background.jsx'
import Button from './common/Button.jsx'
import GlobalStateProvider from './common/GlobalStateProvider.jsx'
import LocaleSelector from './games/common/LocaleSelector.jsx'
import About from './pages/About.jsx'
import GameContainer from './pages/GameContainer.jsx'
import GameSelect from './pages/GameSelect.jsx'
import Home from './pages/Home.jsx'
import PlayerSelect from './pages/PlayerSelect.jsx'


const App = () => {

  const scrollRef = useRef()

  return <GlobalStateProvider>
        <div className="relative h-screen">
          <div ref={scrollRef} className="absolute z-10 top-0 left-0 w-full h-full overflow-scroll">
            <ScrollContext.Provider value={scrollRef}>
              <header className="z-50 fixed top-0 w-full py-4 px-2">
                <Link to="/">
                  <Button pill color="blue" size="small">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </Button>
                </Link>

                <div className="fixed right-0 p-4 top-0">
                  <LocaleSelector />
                </div>
              </header>
              <main className="container max-w-md mx-auto pt-12 h-full">
                <Switch>
                    <Route path="/players">
                      <PlayerSelect />
                    </Route>
                    <Route path="/game-selection/:rest*">
                      <GameSelect />
                    </Route>
                    <Route path="/game/:name">
                      <GameContainer />
                    </Route>
                    <Route path="/about">
                      <About />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                </Switch>
              </main>

          </ScrollContext.Provider>
        </div>
        <Background />
      </div>
  </GlobalStateProvider>
}

export default App
