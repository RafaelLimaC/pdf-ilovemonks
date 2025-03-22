import { useState } from "react";
import { Link } from "react-router-dom";
import ilovemonks from "/src/assets/ilovemonks.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex h-[60px] bg-white px-6 [box-shadow:0_3px_6px_0_rgba(50,_50,_50,_.3)]">
      <nav className="flex items-center justify-between md:justify-start  w-full gap-10">
        <Link to="/">
          <img className="h-[30px]" src={ilovemonks} alt="I love Monks" />
        </Link>
        <div className="hidden md:flex justify-between md:justify-start items-center gap-10">
          <Link
            to="/merge"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/merge" ? "text-accent" : "text-[#161616]"
            }`}
          >
            JUNTAR PDF
          </Link>
          <Link
            to="/split"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/split" ? "text-accent" : "text-[#161616]"
            }`}
          >
            DIVIDIR PDF
          </Link>
          <Link
            to="/img-to-pdf"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/img-to-pdf" ? "text-accent" : "text-[#161616]"
            }`}
          >
            IMG PARA PDF
          </Link>
          <Link
            to="/pdf-to-img"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/pdf-to-img" ? "text-accent" : "text-[#161616]"
            }`}
          >
            PDF PARA IMG
          </Link>
        </div>
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </nav>
      {isMenuOpen && (
        <div className="absolute right-2 top-12 z-10 md:hidden flex flex-col items-start gap-4 mt-4 bg-white [box-shadow:0_3px_6px_0_rgba(50,_50,_50,_.3)] p-4">
          <Link
            to="/merge"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/merge" ? "text-accent" : "text-[#161616]"
            }`}
          >
            JUNTAR PDF
          </Link>
          <Link
            to="/split"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/split" ? "text-accent" : "text-[#161616]"
            }`}
          >
            DIVIDIR PDF
          </Link>
          <Link
            to="/img-to-pdf"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/img-to-pdf" ? "text-accent" : "text-[#161616]"
            }`}
          >
            IMG PARA PDF
          </Link>
          <Link
            to="/pdf-to-img"
            className={`text-[14px] font-medium active:text-accent ${
              location.pathname === "/pdf-to-img" ? "text-accent" : "text-[#161616]"
            }`}
          >
            PDF PARA IMG
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
