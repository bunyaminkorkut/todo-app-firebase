import Link from 'next/link'
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai'
export default function Footer() {
  return (
    <footer className='text-white flex-col justify-end items-center gap-y-4 py-4 flex'>
      <p>Created by BUNYAMIN KORKUT</p>
      <div className='flex justify-center items-center gap-x-4'>
        <Link className='text-2xl' href={'https://www.linkedin.com/in/bnymnkrkt/'} rel="noopener noreferrer" target="_blank">
          <AiFillLinkedin />
        </Link>
        <Link className='text-2xl' href={'https://github.com/bunyaminkorkut'} rel="noopener noreferrer" target="_blank">
          <AiFillGithub />
        </Link>
        <Link className='text-2xl' href={'mailto:bunyaminkrkt@hotmail.com'} rel="noopener noreferrer" target="_blank">
          <AiOutlineMail />
        </Link>
      </div>
    </footer>
  )
}