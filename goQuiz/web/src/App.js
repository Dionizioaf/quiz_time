import React, { Children } from 'react'
import { Grommet, Page, PageHeader, PageContent, Text, Button } from 'grommet'


import Cliente from "./pages/cliente"

const RouterContext = React.createContext({})

const Router = ({ children }) => {
  const [path, setPath] = React.useState("/")

  React.useEffect(() => {
    const onPopState = () => setPath(document.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const push = nextPath => {
    if (nextPath !== path) {
      window.history.pushState(undefined, undefined, nextPath)
      setPath(nextPath)
      window.scrollTo(0, 0)
    }
  }

  return (
    <RouterContext.Provider value={{ path, push }}>
      {children}
    </RouterContext.Provider>
  )
}

const Routes = ({ children }) => {
  const { path: contextPath } = React.useContext(RouterContext)
  let found
  Children.forEach(children, child => {
    if (!found && contextPath === child.props.path) found = child
  })
  return found || null
}

const Route = ({ Component, path }) => {
  const { path: contextPath } = React.useContext(RouterContext)
  return contextPath === path ? <Component /> : null
}

const Screen = () => {
  const { push } = React.useContext(RouterContext)
  console.log("Screen component rendered")

  return (
    <Page>
      <PageHeader title="Welcome" subtitle="Home Screen" />
      <PageContent>
        <Text>Welcome to the Quiz App!</Text>
        <Button label="Go to Cliente" onClick={() => push('/cliente')} />
      </PageContent>
    </Page>
  )
}


const App = () => (
  <Grommet full>
    <Router>
      <Routes>
        <Route path="/" Component={Screen} />
        <Route path="/cliente" Component={Cliente} />
      </Routes>
    </Router>
  </Grommet>
);

export default App;