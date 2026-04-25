import { Link } from 'react-router-dom'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="bg-footer-bg text-white font-body">
      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-2xl mb-5 font-display">Ayesha Jan M.</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              3D Artist & Designer specializing in product visualization, Amazon listings,
              and creative direction.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Navigation
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Work */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Work
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/amazon" className="text-gray-300 hover:text-white transition-colors">
                  Amazon
                </Link>
              </li>
              <li>
                <Link to="/3d" className="text-gray-300 hover:text-white transition-colors">
                  3D Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Connect
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Behance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Ayesha Jan M. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
