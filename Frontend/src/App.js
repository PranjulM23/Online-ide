import { useState } from 'react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { dracula } from '@uiw/codemirror-theme-dracula';
import "./App.css"
import "./component/Nav"

export default function App() {
  const [code, setcode] = useState("")
  const [info, setinfo] = useState("")
  const [getlan, setlan] = useState("")
  const [input, setinput] = useState('');
  const [getout, setout] = useState('');
  function gg() {
    var ff = document.getElementById('select')
    setlan(ff.value)
  }
  const handle = async () => {
    var date = new Date();
    var sec = date.getMilliseconds();
    const payload = ({
      language: getlan,
      code,
      input
    })
    const out = await axios.post("http://localhost:5001/run", payload);
    var fsec = date.getMilliseconds();
    if (out.data.output === undefined) {
      setout(out.data.error.stderr)
      setinfo("Sorry You did Something Wrong 😔 Please Check error")
    } else {
      var str = "Time taken := 0.001sec\n";
      var str1 = "Accepted\n"
      var str2 = `File := Main.${getlan}`
      setout(out.data.output);
      if(fsec-sec === 0){
        setinfo(str1 + str + str2)
      }else if (fsec-sec === 5) {
        setinfo("2.05sec")
      }
    }
    // console.log(out)
  }
  return (
    <div className='App'>
      <div className='home'>
        <div className='left1'>
          <div className="nav">
            <div className="left">
              <select name="Select" id="select" onClick={gg}>
                <option value="none" disabled selected>Select</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="py">Python</option>
              </select>
            </div>
            <div className="right">
              <button>Online CPC</button>
              <button onClick={() => handle()}>Run</button>
            </div>
          </div>
          <CodeMirror
            value={code}
            height="90vh"
            width="100%"
            theme={dracula}
            extensions={[java()]}
            onChange={(editor, change) => {
              setcode(editor);
            }}
          />
        </div>
        <div className='right1'>
          <div className='field'>
            <h3>Input</h3>
            <textarea rows={4} cols={34} id='input' value={input}  onChange={(e) => { setinput(e.target.value) }}></textarea>
          </div>
          <div className='field'>
            <h3>output</h3>
            <textarea rows={12} cols={34} id='output' value={getout}></textarea>
          </div>
          <div className='field'>
            <h3>Information</h3>
            <textarea rows={5} cols={34} id='output' value={info} ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
