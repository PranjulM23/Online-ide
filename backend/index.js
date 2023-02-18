const  express = require('express');
const { executeCpp, executeJava , executepy} = require('./EXEC');
const { generatefile } = require('./generatefiles');
const { generate1 } = require('./inputfilegenerator');
const app = express()
const cors = require('cors');
const port = 5001
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:"true"}));
app.get('/', (req, res) => {
    return res.json({hello:"Wor rdld"})
});

app.post("/run", async(req,res)=>{
    const {language , code, input} = req.body;
    if(code === undefined ){
       return res.json({success:"false", message:"Enter some code plzzz"})
    }
    try {
        const files = await generatefile(language,code) 
        const fileinput = await generate1(input);
        var output="";
        if (language == "cpp" || language==="c++") {
              output  = await executeCpp(files);
        }else if (language === "python" || language === "py") {
             output  = await executepy(files);
        }else if (language === "Java" || language === "java") {
            output  = await executeJava(files);
        }
        res.json({files,output})
    } catch (error) {
        res.json({error})
    }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))