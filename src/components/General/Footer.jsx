import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 !py-10 !px-6">
      <div className="max-w-7xl !mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 border-b border-gray-700 !pb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white !mb-2">SimJob</h3>
            <p className="text-gray-400 max-w-sm">
              AI-powered interview preparation platform
            </p>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-10 md:gap-16 text-center md:text-left">
            {/* Product */}
            <div>
              <h4 className="text-lg font-semibold text-white !mb-3">
                Product
              </h4>
              <ul className="!space-y-2">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-white !mb-3">
                Company
              </h4>
              <ul className="!space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactus"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-lg font-semibold text-white !mb-3">
                Social Links
              </h4>
              <ul className="!space-y-2">
                <li>
                  <a
                    href="https://x.com/SahilWarkhade9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/sahilwarkhade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center !mt-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SimJob. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
