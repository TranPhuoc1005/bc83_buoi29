import { Provider } from 'react-redux'
import { store } from './redux/store'
import './App.css'
import Layout from './components/LayoutTicket'

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}

export default App