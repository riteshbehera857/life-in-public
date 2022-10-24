import { ArrowLeft } from '@components/ui/icons'
import Link from 'next/link'
import React from 'react'

const PageHeader = ({backHref}) => {
  return (
    <div className="h-[8vh] flex gap-8 items-center">
        <Link href={backHref}>
          <ArrowLeft className="h-10 w-10 cursor-pointer" />
        </Link>
        <h3 className="text-[2.4rem] font-bold">Create Post</h3>
      </div>
  )
}

export default PageHeader