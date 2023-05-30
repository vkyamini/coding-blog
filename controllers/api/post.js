const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  const body = req.body;
   
  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    
    res.json(newPost);
     } catch (err) {
    
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [Rows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (Rows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
