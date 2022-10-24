import React from 'react'
import { Post } from '../../types'
import PostCard from './PostCard'
import PostInteractions from './PostInteractions'

interface IProps {
  post: Post
}

const PostBlock = ({post}: IProps) => {
  return (
      <>
          <PostCard post={post} />
          <PostInteractions post={post} />
    </>
  )
}

export default PostBlock