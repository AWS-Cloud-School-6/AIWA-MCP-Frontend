import React from 'react';

function AddVPCButton() {
  return (
    <button className="flex overflow-hidden gap-2 items-center px-3 py-1.5 text-sm font-medium tracking-wide leading-none text-white bg-blue-600 rounded-md shadow-sm">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
      <span className="self-stretch my-auto">Add customer</span>
    </button>
  );
}

export default AddVPCButton;