const questionBank = require("../database/models/questionBank")

async function publishQuestionBank(req, res) {
    const qbProps = req.body

    try{
        if(qbProps.teacher_id.length > 0){
            const writeresult = await questionBank.create(qbProps);
            console.log(writeresult)
            res.status(200).json("Your question Bank published successfully")
        }else{
            res.status(400).json("Data insufficient")
        }

    }catch(err){
        console.log(err.message)
        res.err("Error publishing your question bank")
    }

}

module.exports = {
    publishQuestionBank : publishQuestionBank
  }