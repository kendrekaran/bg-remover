import React from 'react';
import { Button } from './ui/button';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-transparent z-10 w-full p-8 shadow-md fixed top-0 flex  justify-between items-center">
      <div className="text-md sm:text-xl  text-slate-300 hover:text-blue-600 ">
        <Link href="/" className='flex'>
            <h1 className='font-bold'>ImageClipper</h1>
        </Link>
      </div>
      <div className="flex gap-4 ">
        <Link href="https://github.com/kendrekaran/video_downloader">
            <Button className="bg-white text-black px-4 py-2 rounded-3xl hover:bg-black hover:text-white hover:border">
            <FaGithub/>  
            <h2 className='hidden sm:inline-block text-xs font-semibold'>Star me on GitHub</h2>
            </Button>
        </Link>
        <Link href="https://x.com/kendrekaran_">
            <Button className="bg-white text-black px-4 py-2 rounded-3xl hover:bg-black hover:text-white hover:border">
            <FaXTwitter />
            <h2 className='hidden sm:inline-block text-xs font-semibold'>Follow me on Twitter</h2>
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

const Logo = () => {
    return (
        <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M20 3C20.5523 3 21 3.44772 21 4V5.757L19 7.757V5H5V13.1L9 9.1005L13.328 13.429L12.0012 14.7562L11.995 18.995L16.2414 19.0012L17.571 17.671L18.8995 19H19V16.242L21 14.242V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20ZM21.7782 7.80761L23.1924 9.22183L15.4142 17L13.9979 16.9979L14 15.5858L21.7782 7.80761ZM15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7Z"></path></svg>
    );
};