import First from "../../sections/First/First"
import Second from "../../sections/Second/Second"
import Third from "../../sections/Third/Third"
import Fourth from "../../sections/Fourth/Fourth"
import Sixth from "../../sections/Sixth/Sixth"
import Fifth from "../../sections/Fifth/Fifth" 
import Chat from "./Chat/Chat"

const Sections = () => {
  return (
    <>
      <div>
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

export default Sections