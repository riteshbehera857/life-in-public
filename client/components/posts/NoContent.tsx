import Image from 'next/future/image'
import React from 'react'

interface IProps {
    displayImg: string;
    body: string
}

const NoContent = ({displayImg, body}: IProps) => {
  return (
      <div className="w-full h-full text-center flex flex-col items-center justify-center gap-10">
          <Image src={displayImg} alt="No Content" height={200} width={200} className="w-3/5" />
          <h1 className='text-3xl font-bold'>{body}</h1>
    </div>
  )
}

export default NoContent