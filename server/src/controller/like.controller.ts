import { NextFunction, Request, Response } from 'express'
import Like from './../models/like.model'

export const addLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postID } = req.params
        const { userID } = req.body
        
        if (!postID || !userID) {
            throw new Error("Some error occured, Please tyr after some time")
        }

        const data = await Like.find({
            user: userID,
           post: postID
        })
        
        if (data.length) {
            await Like.deleteMany({
                user: userID,
                post: postID
            })
            return res.status(200).json({
            status: "success",
            error: false,
        })
        }

        await Like.create({
            post: postID,
            user: userID
        })

        return res.status(200).json({
            status: "success",
            error: false,
        })

    } catch (error) {
        next(error)
    }
}

export const getAllLikes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postID } = req.params
        const { userID } = req.query
        let currentUserLikedOrNot;
        
        if (!postID) throw new Error("Some error occured")
        
        const userLiked = await Like.find({
            post: postID,
            user: userID
        })

        if (userLiked.length) {
            currentUserLikedOrNot = true
        } else {
            currentUserLikedOrNot = false
        }
        
        const data = await Like.find({
           post: postID
        })
        if(!data) return res.status(200).json({status: "success", error: false, data: 'no-content'})
        return res.status(200).json({
            status: "success",
            error: false,
            currentUserLikedOrNot,
            data
        })
    } catch (error) {
        next(error)
    }
}