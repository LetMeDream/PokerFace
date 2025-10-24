import First from './sections/First/First'
import Second from './sections/Second/Second'
import Third from './sections/Third/Third'
import Fourth from './sections/Fourth/Fourth'
import Fifth from './sections/Fifth/Fifth'
import Sixth from './sections/Sixth/Sixth'
import Chat from './components/liveChat/Chat/Chat'

function App() {

  return (
    <>
      <div className="App">
        <First />
        <Second />
        <Third />
        <Fourth />
        <Fifth />
        <Sixth />
      </div>
      <Chat />
    </>
  )
}

export default App
