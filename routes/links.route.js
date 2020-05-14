const {Router} = require('express')
const router = Router()
const Link = require('../models/Link')
const auth = require('../middleware/auth')
const config = require('config')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res) => {
    try {
        console.log(req.body)
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const existing = await Link.findOne({from})
        if (existing) {
            return res.json({link: existing})
        }
        const code = shortid.generate()

        const to = baseUrl + '/t/' + code
        const link = new Link({
            from, to, code, owner: req.user.userId
        })
        console.log('Created link', link)
        await link.save()
        res.status(201).json(link)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Oops, something went wrong, try again later"})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        console.log('req.user.userId', req.user.userId)
        const links = await Link.find({owner: req.user.userId})
        console.log('links', links)
        res.json(links)

    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Oops, something went wrong, try again later"})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Oops, something went wrong, try again later"})
    }
})

module.exports = router