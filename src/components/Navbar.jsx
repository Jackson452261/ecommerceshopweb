import { motion } from "framer-motion";
import { useState } from "react";
import { FiMenu, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom"; // 引入 Link

export const Navbar = () => {
  return (
    <div className="bg-gray-50">
      <FlipNav />
      <div className="h-72" />
    </div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between relative">
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <NavMenu isOpen={isOpen} />
    </nav>
  );
};

const Logo = () => {
  return (
    <svg
      width="50"
      height="39"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-gray-800"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

const NavLeft = ({ setIsOpen }) => {
  return (
    <div className="flex items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block lg:hidden text-gray-950 text-2xl"
        onClick={() => setIsOpen((pv) => !pv)}
      >
        <FiMenu />
      </motion.button>
      <Logo />
      <NavLink to="/" text="首頁" /> {/* 使用 Link 來導航到首頁 */}
      <NavLink to="/solutions" text="Solutions" />
      <NavLink to="/community" text="Community" />
      <NavLink to="/pricing" text="Pricing" />
      <NavLink to="/company" text="Company" />
    </div>
  );
};

const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to} // 使用 Link 元件的 `to` 屬性來導航
      className="hidden lg:block h-[30px] overflow-hidden font-medium"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </Link>
  );
};

const NavRight = () => {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
      >
        Sign in
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-md whitespace-nowrap"
      >
        Sign up
      </motion.button>
    </div>
  );
};

const NavMenu = ({ isOpen }) => {
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute p-4 bg-white shadow-lg left-0 right-0 top-full origin-top flex flex-col gap-4"
    >
      <MenuLink to="/solutions" text="Solutions" />
      <MenuLink to="/community" text="Community" />
      <MenuLink to="/pricing" text="Pricing" />
      <MenuLink to="/company" text="Company" />
    </motion.div>
  );
};

const MenuLink = ({ to, text }) => {
  return (
    <motion.div
      variants={menuLinkVariants}
      className="h-[30px] overflow-hidden font-medium text-lg flex items-start gap-2"
    >
      <Link to={to}>
        <motion.span variants={menuLinkArrowVariants}>
          <FiArrowRight className="h-[30px] text-gray-950" />
        </motion.span>
        <motion.div whileHover={{ y: -30 }}>
          <span className="flex items-center h-[30px] text-gray-500">{text}</span>
          <span className="flex items-center h-[30px] text-indigo-600">{text}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Navbar;

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};
