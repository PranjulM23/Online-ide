const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, "codes");
// if (!fs.existsSync(outputPath)) {
    // fs.mkdirSync(outputPath, { recursive: true });
// }

const generate1 = async(input)=>{
    const filepath = path.join(outputPath, "input.txt");
    await fs.writeFileSync(filepath,input);
    return input;    
}

module.exports={
    generate1,
}