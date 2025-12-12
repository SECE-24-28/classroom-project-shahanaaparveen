import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

/* Reusable Styles */
const menuBtn = "text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-red-400 px-3 py-2 text-sm font-medium";
const dropdown = "absolute left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 w-56 z-50";
const dropdownItem = "block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
         {/* LOGO WITH DROPDOWN */}
<div className="relative group">
  <Link to="/" className="text-2xl font-bold text-red-700 dark:text-red-400 flex items-center gap-2 cursor-pointer">
    <i className="fa-solid fa-list"></i> 
    MobileRecharge
  </Link>

  {/* DROPDOWN */}
  <div className="absolute left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 w-40 z-50">
    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
      Individuals
    </Link>
    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
      Business
    </Link>
    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
      Investor
    </Link>
  </div>
</div>


          {/* THEME TOGGLE & MOBILE HAMBURGER */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            <button
              className="lg:hidden text-gray-700 dark:text-gray-300 text-2xl"
              onClick={toggleMobileMenu}
            >
              ☰
            </button>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-6">

            {/* WIFI */}
            <div className="relative group">
              <button className={menuBtn}>
                Wi-Fi
              </button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>Pay Bill / Recharge</Link>
                <Link to="#" className={dropdownItem}>Buy New Connection</Link>
                <Link to="#" className={dropdownItem}>View Plans</Link>
                <Link to="#" className={dropdownItem}>Refer Wi-Fi</Link>
              </div>
            </div>

            {/* POSTPAID */}
            <div className="relative group">
              <button className={menuBtn}>Postpaid</button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>Upgrade to Postpaid</Link>
                <Link to="#" className={dropdownItem}>Buy New Connection</Link>
                <Link to="#" className={dropdownItem}>Pay Bill</Link>
                <Link to="#" className={dropdownItem}>View Plans</Link>
                <Link to="#" className={dropdownItem}>International Roaming</Link>
                <Link to="#" className={dropdownItem}>Port to FastRecharge</Link>
                <Link to="#" className={dropdownItem}>Free SIM Delivery</Link>
                <Link to="#" className={dropdownItem}>Refer Postpaid</Link>
              </div>
            </div>

            {/* PREPAID */}
            <div className="relative group">
              <button className={menuBtn}>Prepaid</button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>Recharge</Link>
                <Link to="#" className={dropdownItem}>New Prepaid SIM</Link>
                <Link to="#" className={dropdownItem}>View Plans</Link>
                <Link to="#" className={dropdownItem}>International Roaming</Link>
                <Link to="#" className={dropdownItem}>Switch Prepaid → Postpaid</Link>
                <Link to="#" className={dropdownItem}>Refer Prepaid</Link>
              </div>
            </div>

            {/* DTH */}
            <div className="relative group">
              <button className={menuBtn}>DTH</button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>Recharge</Link>
                <Link to="#" className={dropdownItem}>New DTH Connection</Link>
                <Link to="#" className={dropdownItem}>Buy IPTV</Link>
                <Link to="#" className={dropdownItem}>View Plans</Link>
                <Link to="#" className={dropdownItem}>Xstream</Link>
                <Link to="#" className={dropdownItem}>Buy 2nd DTH Connection</Link>
                <Link to="#" className={dropdownItem}>Refer DTH</Link>
              </div>
            </div>

            {/* FASTRECHARGE BACK */}
            <div className="relative group">
              <button className={menuBtn}>FastRecharge Back</button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>Pay Bill</Link>
                <Link to="#" className={dropdownItem}>View Plans</Link>
              </div>
            </div>

            {/* BANK */}
            <div className="relative group">
              <button className={menuBtn}>Bank</button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>View Account</Link>
                <Link to="#" className={dropdownItem}>Get New Account</Link>
                <Link to="#" className={dropdownItem}>Add Money</Link>
                <Link to="#" className={dropdownItem}>Know More</Link>
              </div>
            </div>

            {/* FINANCE */}
            <div className="relative group">
              <button className={menuBtn}>Finance</button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>Credit Card</Link>
                <Link to="#" className={dropdownItem}>Personal Loan</Link>
                <Link to="#" className={dropdownItem}>Business Loan</Link>
                <Link to="#" className={dropdownItem}>Gold Loan</Link>
                <Link to="#" className={dropdownItem}>Insta EMI Card</Link>
                <Link to="#" className={dropdownItem}>Fixed Deposits</Link>
                <Link to="#" className={dropdownItem}>Loan Against Mutual Funds</Link>
                <Link to="#" className={dropdownItem}>Free Credit Report</Link>
                <Link to="#" className={dropdownItem}>Know More</Link>
              </div>
            </div>

            {/* HELP */}
            <div className="relative group">
              <button className={menuBtn}>Help</button>
              <div className={dropdown}>
                <Link to="#" className={dropdownItem}>Chat or Raise Complaint</Link>
                <Link to="#" className={dropdownItem}>Find Nearby Store</Link>
                <Link to="#" className={dropdownItem}>Explore Thanks App</Link>
                <Link to="#" className={dropdownItem}>Refer & Earn</Link>
              </div>
            </div>

            {/* ABOUT */}
            <div className="relative group">
              <button className={menuBtn}>About</button>
            </div>

            {/* LOGIN & SIGNUP BUTTONS OR USER MENU */}
            <div className="flex items-center space-x-3 ml-6">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/dashboard" 
                    className="text-primary hover:text-secondary px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-600 hover:text-red-600 px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-secondary px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <i className="fas fa-user-plus mr-2"></i>Sign Up
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE MENU (COLLAPSIBLE) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-md px-4 py-3 space-y-2">

          {/* Repeat only main menu names (no dropdowns for mobile yet) */}
          <button className={menuBtn}>Wi-Fi</button>
          <button className={menuBtn}>Postpaid</button>
          <button className={menuBtn}>Prepaid</button>
          <button className={menuBtn}>DTH</button>
          <button className={menuBtn}>FastRecharge Back</button>
          <button className={menuBtn}>Bank</button>
          <button className={menuBtn}>Finance</button>
          <button className={menuBtn}>Help</button>
          <button className={menuBtn}>About</button>
          
          {/* MOBILE LOGIN & SIGNUP OR USER MENU */}
          <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-600">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-primary hover:text-secondary px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors flex items-center text-left"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-primary hover:text-secondary px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-primary hover:bg-secondary text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <i className="fas fa-user-plus mr-2"></i>Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
