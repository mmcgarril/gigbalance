const User = require("../models/user");

const getDashboard = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id}).select('_id username email')
        
        if (!user) {
            res.status(404).json({message: 'User not found'})
            return
        }

        res.status(200).json({user})
    } catch (error) {
        console.error('Error getting dashboard:', error);
    }
}

module.exports = getDashboard