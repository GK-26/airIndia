const helpDetails = (req, res) =>{
    return res.status(200).send({
        message: "sucessfully hitting the help API",
        sucess: true,
        data : {
            constact: "919866XXXXX"
        }
    })
}


module.exports = {
    helpDetails
}