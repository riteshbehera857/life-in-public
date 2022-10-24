import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { Post } from '../../types'

interface IProps {
  post: Post
}

const PostInteractions = ({post}: IProps) => {
  return (
      <>
          <div className="">
              <p className="font-bold text-[1.5rem]">
                {post?.likes.length} likes
              </p>
            </div>
            <div className="mb-[1rem]">
              <p className="font-bold text-[1.5rem]">
                {post?.created_by?.firstname}{" "}
                <span className="font-normal">{post?.caption}</span>
              </p>
            </div>
            <div>
              <Link href={`/post/comments/${post._id}`}>
                <p className="text-[1.5rem] cursor-pointer hover:text-[#6b6b6b] transition-colors text-[#bbbbbb]">
                  View all comments
                </p>
              </Link>
            </div>
            <div className="">
              <p className="text-[1.5rem] text-[#bbbbbb]">
                {moment(post?.created_at).format("DD MMM, YYYY")}
              </p>
            </div>
      </>
  )
}

export default PostInteractions