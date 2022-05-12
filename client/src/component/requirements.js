import React, { useState ,useRef} from 'react'
import { Users } from "./data";

function Requirements() {
    const dropRef = useRef(); 
    const [open, setOpen] = useState(false)
    const [data,setData]=useState([])
    const selectMe = (u) => {
        console.log("u :",u)
     setOpen(!open)
     console.log("open :",open)
   dropRef.current.style.border = '2px dashed #ececec'
  
    }
    return (
        <>
            {Users.map((u) => (
                <div key={u.id}  onClick={() => {selectMe(u);
                setData(data => [...data, u]);console.log("data :",data)}} >
                   
                    <img src={u.Picture} alt="" style={{ height: "50px", width: '50px' }} ref={dropRef} />
                    <span>{u.username}</span>
                </div>
            ))}

        </>
    )
}

export default Requirements