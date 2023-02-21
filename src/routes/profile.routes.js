import {Router} from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render('profile', {
        title: 'Profile',
        style: 'css/profile.css'
    })
})

export default router;