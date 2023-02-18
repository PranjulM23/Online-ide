const path = require('path');
const fs = require('fs');
const {v4 : uid} = require('uuid')
const dirpath = path.join(__dirname , "codes");
if(!fs.existsSync(dirpath)){
    fs.mkdirSync(dirpath, {recursive:true});
}
const generatefile =async(format,code)=>{
    const id = uid();
    const filname = `Main.${format}`;
    const filepath = path.join(dirpath, filname);
    await fs.writeFileSync(filepath, code);
    return filepath
}

module.exports={
    generatefile,
};