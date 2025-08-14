import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
          <div className="footer-content flex justify-evenly items-center">
            <div className="footer-brand">
              <h3>SimJob</h3>
              <p>AI-powered interview preparation platform</p>
            </div>
            <div className="footer-links flex gap-16 md:gap-24">
              <div className="footer-column">
                <h4>Product</h4>
                <Link href="#">Features</Link>
                <Link href="#">Pricing</Link>
                <Link href="#">Demo</Link>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <Link href="#">About</Link>
                <Link href="#">Careers</Link>
                <Link href="#">Contact</Link>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <Link href="#">Help Center</Link>
                <Link href="#">Privacy</Link>
                <Link href="#">Terms</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 SimJob. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
