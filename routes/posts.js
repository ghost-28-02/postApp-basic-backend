const express = require('express');
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    commentOnPost
} = require("../controllers/postControllers");

router.post("/", protect, createPost);          
router.get("/", getAllPosts);                   
router.get("/:id", getPostById);                
router.put("/:id", protect, updatePost);        
router.delete("/:id", protect, deletePost);    

router.put("/:postId/like", protect, likePost);     
router.put("/:id/comment", protect, commentOnPost); 

module.exports = router;