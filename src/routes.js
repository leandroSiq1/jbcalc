const express = require('express');
const router = express.Router();

const views = __dirname + '/views/';

router.get('/', (req, res) => res.render(views + "index"));
router.get('/job', (req, res) => res.render(views + "job"));
router.get('/job/edit', (req, res) => res.render(views + "job-edit"));
router.get('/profile', (req, res) => res.render(views + "profile"));

module.exports = router;