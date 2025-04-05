import { NavLink } from "react-router-dom";

const MyNavbar = () => {
  return (
    <>
      <nav className="bg-transparent py-4 fixed top-0 right-4 w-auto">
        <div className="container mx-auto flex justify-end items-center pr-8">
          {/* Navbar Links */}
          <div className="flex space-x-6">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/myWork", label: "My Work" },
              { to: "/contact", label: "Contact" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className="relative uppercase text-lg font-medium tracking-wider text-gray-900 no-underline transition-all duration-300 ease-in-out hover:scale-110 hover:font-bold group"
              >
                {item.label}
                {/* Underline Effect */}
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-gray-900 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MyNavbar;
