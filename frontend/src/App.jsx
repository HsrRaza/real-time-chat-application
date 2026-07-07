import { useEffect } from "react"
import { socket } from "./socket"
import { useState } from "react"


const App = () => {

  const [message, setMessage] = useState([])

  const [user, setUser] = useState("")
  const [text, setText] = useState("")
  const [join ,setJoin] = useState(false)


  const joinRoom = ()=>{
    if(!user.trim()) return
   
    setJoin(true)



  }





  const sendBtn = () => {

    if (!text.trim()) return;

    socket.emit("send-message", {
      user: user,
      text: text
    })


    setText("")
  }




  useEffect(() => {

    socket.on("receive-message", (message) => {
      console.log(message);

      setMessage((prev) => [...prev, message])

    })

    return () => {
      socket.off("receive-message")
    }

  }, [])



  return (
    <div>Chat app

     {
      !join && 
       <div>

        <label htmlFor="">Username</label>
        <input type="text" value={user}
        onChange={(e)=> setUser(e.target.value)}
         />

         <button onClick={joinRoom}>join </button>
      </div>
     }


{
  join && <div>

      <div>


        <div>


          <input type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={sendBtn}>send</button>

        </div>

        <div>
          {
            message.map((msg, index) => (
              <div key={index}>
                <h3>{msg.user}</h3>
                <p>{msg.text}</p>
              </div>
            ))
          }
        </div>

      </div>

  </div>
}


    

    </div>
  )
}

export default App