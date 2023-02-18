import React from 'react'
import "./nav.css"
function Nav() {
  return (
    <div className="nav">
        <div className="left">
            <select name="Select" id="select">
                <option value="none" disabled selected>Select</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="py">Python</option>
            </select>
        </div>
        <div className="right">
            <button>Online CPC</button>
            <button>Run</button>
        </div>
    </div>
  )
}

export default Nav
