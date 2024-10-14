import React from 'react';

const SearchService: React.FC = () => {
  return (
    <div className="flex flex-col grow shrink-0 self-start px-2.5 pt-2.5 basis-0 min-h-[169px] w-fit max-md:max-w-full">
      <div className="flex flex-col px-5 pb-6 w-full">
        <label htmlFor="searchService" className="self-start font-medium text-zinc-800">
          Search Service
        </label>
        <div className="flex gap-5 justify-between px-6 py-3 bg-white rounded-lg shadow-[0px_4px_14px_rgba(0,0,0,0.1)] text-stone-500 max-md:px-5">
          <input
            type="text"
            id="searchService"
            placeholder="Search Service"
            className="bg-transparent border-none outline-none"
          />
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4efbd9eb8564d0657ef6e207daa1ca10500c0207cd8ecc688d048af53976e098?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" className="object-contain shrink-0 my-auto w-3.5 aspect-[3.5]" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SearchService;