import { Router } from 'express'
import {getAllLikes, addLike} from './../controller/like.controller'

const router = Router()

router.route("/:postID").get(getAllLikes).post(addLike)

export default router