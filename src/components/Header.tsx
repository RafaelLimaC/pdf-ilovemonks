import { Link } from "react-router-dom";
import ilovemonks from "/src/assets/ilovemonks.png";

const Header = () => {
  return (
    <header className="flex h-[60px] bg-white px-6 [box-shadow:0_3px_6px_0_rgba(50,_50,_50,_.3)]">
      <nav className="flex items-center gap-10">
        <Link to="/">
          <img className="h-[30px]" src={ilovemonks} alt="I love Monks" />
        </Link>
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
      </nav>
    </header>
  );
};
export default Header;
