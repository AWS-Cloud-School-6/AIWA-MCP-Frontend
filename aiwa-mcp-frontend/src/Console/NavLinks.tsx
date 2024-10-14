import React from 'react';

const NavLinks: React.FC = () => {
  const links = ['Home', 'Network', 'EC2'];

  return (
    <>
      {links.map((link, index) => (
        <a href={`#${link.toLowerCase()}`} key={index} className="self-stretch my-auto">
          {link}
        </a>
      ))}
    </>
  );
};

export default NavLinks;