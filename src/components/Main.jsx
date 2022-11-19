<Switch>
              <Route path="/players">
                <PlayerSelect
                  players={state.players}
                  onSubmit={players => {
                    setState({
                      ...state,
                      players
                    })
                    navigate('/game-selection/')
                  }}
                />
              </Route>
              <Route path="/game-selection/:rest*">
                <GameSelect
                  onSubmit={game => {
                    setState({
                      ...state,
                      game
                    })
                    navigate('/game')
                  }}
                />
              </Route>
              <Route path="/game">
                <GameContainer
                  game={selectedGame}
                  players={state.players}
                />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>