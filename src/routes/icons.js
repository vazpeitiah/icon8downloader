const express = require('express');
const icon8 = require('../icon8')

const router = express.Router();

router.get('/', async (req, res) => {
    const icons = await icon8.getIconsForAnyCategory("coffee", "280");
    res.render('icons/IconList', {icons});  
});

router.post('/', async (req, res) => {
    const {size, keywords, style} = req.body;
    if(style === "All"){
        const icons = await icon8.getIconsForAnyCategory(keywords, size);
        res.render('icons/IconList', {icons});
    }else{
        const icons = await icon8.getIconsByCategory(keywords, size, style);
        res.render('icons/IconList', {icons});
    }
});

module.exports = router;