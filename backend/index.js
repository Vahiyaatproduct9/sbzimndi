import express, { json } from 'express'
import cors from 'cors'
import verifyWithOTP from './api/verifyWithOTP.js'
import signup from './api/signup.js'
import getProfile from './api/getProfile.js'
import addPost from './api/addpost.js'
import multer from 'multer'
import checkUser from './api/checkUser.js'
import signin from './api/signin.js'
import extendToken from './api/extendToken.js'
import { read_items } from './api/readitems.js'
import search from './api/search.js'
const app = express()
const port = 8080
app.use(json())
app.use(cors({
    allowedHeaders: ['*']
}))

const upload = multer({ storage: multer.memoryStorage() });
app.post('/profile', async (req, res) => {
    const { access_token } = await req.body
    if (access_token) {
        const response = await getProfile({ access_token })
        res.status(response.status).json(response)
    }
})

app.post('/signup', async (req, res) => {
    const { name, email, password, phone, location } = await req.body
    console.log(await req.body)
    const data = await signup({ name, email, password, phone, location })
    if (data === true) {
        console.log('User', name, 'signed up...')
    }
    else {
        console.log('Failed to create new user for ', name)
    }
    res.send(data)
})
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await signin({ email, password });
        console.log(data.session.access_token, error)
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (data.session) {
            return res.status(200).json({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token
            });
        }
        // fallback if no error but no session
        return res.status(400).json({ error: "Login failed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/verify', async (req, res) => {
    const { email, token } = await req.body
    console.log(req.body)
    const response = await verifyWithOTP({ email, token })
    if (response) {
        res.json(response)
    }
    else {
        const data = { status: '400' }
        res.status(400).send(data)
    }
    console.log(response)

})
app.post('/addpost', upload.single('photo'), async (req, res) => {
    const info = JSON.parse(req.body.info)
    const photo = req.file
    if (!photo) return res.status(400).json({ error: "No file uploaded" });
    const { imgData, imgError } = await addPost({ photo, info })
    console.log('addpost -->', imgData, imgError)
    if (!imgError && imgData.fullPath) {
        res.sendStatus(200)
    }
    else res.sendStatus(imgError.status || 400)
})
app.post('/extendToken', async (req, res) => {
    const { refresh_token } = req.body
    const { data, error } = await extendToken(refresh_token)
    if (data.session) {
        return res.json({
            status: 200,
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token
        })
    }
    else return res.json({
        status: error ? error.status : 400,
        ...error
    })
})


app.post('/search', async (req, res) => {
    console.log('Search function running...')
    const { latitude, longitude, query } = req.body;
    const result = await search({ latitude, longitude, query })
    res.json(result)
})


app.post('/getItems', async (req, res) => {
    const { latitude, longitude } = req.body;
    const { data, error } = await read_items({ latitude, longitude })
    console.log(data.slice(1, 3), error)
    console.log('Provided location goes', latitude, longitude)
    if (error || !data) res.status(error.code).json({
        data: error,
        status: error.code
    })
    else res.status(200).json({
        data: data,
        status: 200
    })
})


app.listen(8080, () => {
    console.log('Listening on Port: ', port)
})