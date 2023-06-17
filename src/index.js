import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'

const app = express()
const port = process.env.NODE_PORT
const prisma = new PrismaClient()


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const addNewUser = async (name, email) => {
    const addedUser = await prisma.user.create({
        data: {
            name: name,
            email: email
        },

    })
    return addedUser
}

app.post('/add-user', (req, res) => {
    const { values } = req.body
    const { name, email } = values
    addNewUser(name, email).then((response) => {
        res.status(200).send(response)
    })
    console.log(`The name is ${name} and their email is ${email}`);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})