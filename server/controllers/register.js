const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate data if exist
        if (!(name && email && password)) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Check user already exist or not
        const doesExist = await User.findOne({ email })
        if (doesExist) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }

        //check if email is in correct format
        if (!(validateEmail(email))) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            })
        }

        // encrypt password
        const encryptedPassword = await bcryptjs.hash(password, 10)

        // Save to DB
        const user = await User.create({
            name,
            email,
            password: encryptedPassword
        })

        // Send a token
        const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '2h' })

        user.password = undefined

        cookieOptions = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        return res.status(200).cookie('token', token, cookieOptions).json({
            success: true,
            user,
            token
        })

    } catch (error) {
        console.log(`Error :: register route :: ${error}`);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}