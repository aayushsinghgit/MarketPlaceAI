'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-accent/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AgentForge</h3>
            <p className="text-gray text-sm">The premier platform for AI agents and automation tools</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray text-sm">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><button className="hover:text-accent">Explore</button></li>
              <li><button className="hover:text-accent">Become a Seller</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray text-sm">
              <li>Email: support@agentforge.ai</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" className="hover:text-accent">Twitter</a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-accent">LinkedIn</a>
              <a href="https://github.com" target="_blank" className="hover:text-accent">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-accent/20 mt-8 pt-8 text-center text-gray text-sm">
          <p>&copy; 2024 AgentForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
