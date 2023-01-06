app.get('/yaya', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/sendFile.html'))
})

//   here yaya represents the file path name I assigned, it is arbitrary, it should just be logical

//resposne is sending the file named sendfile.html
// __dirname = the loacation of the base folder, usually public, and is joined into the path created next to it
// the scond parameter is the file path from root folder, to file
// two join together to serve up static page

const thisThing = require('./Assets/thisThing.json') 

app.get('/yaya', (req, res) => {
    res.json(thisThing)
})

// here in the file path we call /yaya we are sending a json file thisThing, usually an array of objects we have out o the static folder