'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

interface Social {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
  color: string;
}

const socials: Social[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/jourdancatarina3',
    color: 'hover:text-[#2ea44f]'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/jourdan-ken-catarina-606485241/',
    color: 'hover:text-[#0077b5]'
  },
  {
    name: 'Email',
    icon: HiMail,
    url: 'mailto:jourdancatarina3@gmail.com',
    color: 'hover:text-[#ea4c89]'
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/20 border-t border-secondary/30">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">Jourdan Catarina</h3>
            <p className="text-text-secondary max-w-xs">
              Building digital experiences with modern web technologies
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-text-secondary ${social.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-text-secondary">
                <HiMail className="w-5 h-5 text-primary" />
                <a href="mailto:jourdancatarina3@gmail.com" className="hover:text-primary transition-colors duration-300">
                  jourdancatarina3@gmail.com
                </a>
              </li>
              <li className="text-text-secondary">
                <span className="flex items-center gap-2">
                  <span className="text-primary">📍</span>
                  Cebu, Philippines
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary/30">
          <p className="text-center text-text-secondary">
            © {currentYear} Jourdan Catarina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 