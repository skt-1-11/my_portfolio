'use client';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.divider} />
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.left}>
            <div className={styles.logo}>
              SKT<span className={styles.logoDot}>.</span>
            </div>
            <p className={styles.tagline}>Building production AI/ML systems that hold up in the real world.</p>
          </div>

          <div className={styles.links}>
            {[
              { label: 'Experience', href: '#experience' },
              { label: 'Projects', href: '#projects' },
              { label: 'Skills', href: '#skills' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className={styles.link}
                whileHover={{ x: 3, color: 'var(--accent-cyan)' }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <p className={styles.copyright}>
          &copy; {year} Sudheer Kumar T &middot; Designed with precision
        </p>
      </div>
    </footer>
  );
}
