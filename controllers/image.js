const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '8f39c57c35974a778494dc5ab54eee9c'
   });

const handleApiCall = (req, res) => {
    app.models.predict(
       Clarifai.FACE_DETECT_MODEL, 
       req.body.input)
       .then(data => {
           res.json(data)
       })
       .catch(err => res.status(400).json('image url error'))
   }

const handleImage = (req, res, db)=> {
    const { id } = req.body
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}