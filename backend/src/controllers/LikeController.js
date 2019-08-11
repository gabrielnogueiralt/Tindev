const Dev = require('../models/Dev');

module.exports = { 
    async store(req, res) {
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targedDev = await Dev.findById(devId);

        if(!targedDev) {
            return res.status(400).json({error: 'Dev not exists'});
        }

        if(targedDev.likes.includes(loggedDev._id)) {
            console.log('Deu match'); 
        }

        loggedDev.likes.push(targedDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};