const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/register',
    [
        check('email', 'Invalid email!').isEmail(),
        check('password', 'minimum length 6 characters!').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            console.log(req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data!'
                })
            }
            const {email} = req.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({message: 'User with email already exist!'})
            }

            const hashPassword = await bcrypt.hash(req.body.password, 12)
            const user = new User({
                email,
                password: hashPassword
            })
            await user.save()
            res.status(201).json({message: 'User created!'})

        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Oops, something went wrong, try again later"})
        }
    })

router.post('/login', [
        check('email', 'Invalid email!').normalizeEmail().isEmail(),
        check('password', 'minimum length 6 characters!').exists()
        // .custom(async (value, {req}) => {
        //     const user = await User.findOne({email: req.body.email})
        //     const isMatch = await bcrypt.compare(user.password, value)
        //     if (!isMatch) {
        //         throw new Error('Invalid email or password!')
        //     }
        //     return true
        // })
    ],
    async (req, res) => {

        try {
            console.log(req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data!'
                })
            }
            const {email, password} = req.body

            const user = await User.findOne({email})

            console.log('User', user)
            if (!user) {
                return res.status(400).json({message: 'User with this email not exist!'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Invalid email or password!'})
            }
            const token =  jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user._id, message: 'Login success!'})

        } catch (e) {
            res.status(500).json({message: "Oops, something went wrong, try again later"})
        }
    })

module.exports = router