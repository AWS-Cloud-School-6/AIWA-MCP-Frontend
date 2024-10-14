import React from 'react';

const UserActions: React.FC = () => {
  return (
    <div className="flex flex-col my-auto font-bold">
      <div className="flex gap-2 w-full">
        <button className="gap-2.5 self-stretch px-4 py-2 text-cyan-700 whitespace-nowrap rounded">
          Logout
        </button>
        <button className="self-stretch px-4 py-2 text-white bg-cyan-700 rounded border border-solid border-black border-opacity-0">
          My Page
        </button>
      </div>
    </div>
  );
};

export default UserActions;