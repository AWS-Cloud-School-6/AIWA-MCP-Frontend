import React from 'react';
import NavLinks from './NavLinks';
import SearchService from './SearchService';
import UserActions from './UserActions';

const NavBar: React.FC = () => {
  return (
    <header className="flex overflow-hidden flex-wrap gap-10 items-center px-8 text-base bg-white shadow-sm max-md:px-5">
      <nav className="flex gap-8 justify-center items-center self-stretch my-auto text-gray-900 whitespace-nowrap min-w-[240px]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d75a80ccddfb49104117d7f54c1db68f1b8ad24c109ad4c908ff5acaad8ed4f5?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" className="object-contain shrink-0 self-stretch my-auto aspect-[1.17] w-[35px]" alt="" />
        <NavLinks />
      </nav>
      <div className="flex flex-wrap grow shrink gap-6 items-start self-stretch pr-3.5 pl-20 my-auto min-w-[240px] w-[831px] max-md:pl-5 max-md:max-w-full">
        <SearchService />
        <UserActions />
      </div>
    </header>
  );
};

export default NavBar;