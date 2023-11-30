const helpDetails = (req, res) =>{
	return res.status(200).send({
		message: `sucessfully hitting the help API`,
		data: {
			contact: 123435
		}
	})
}

export {helpDetails};

