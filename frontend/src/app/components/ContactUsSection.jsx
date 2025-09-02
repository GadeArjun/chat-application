import React from 'react'

function ContactUsSection() {
  return (
    // contact us section
      <section
          id="contact"
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-20 text-center"
        >
          <div className="container mx-auto">
            <h2 className="mb-6 text-4xl font-extrabold text-white">Get in Touch</h2>
            <div className="mb-8 flex justify-center">
              <a
                href="mailto:support@nebulachat.com"
                className="group relative rounded-full border-2 border-lime-500 bg-lime-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">support@nebulachat.com</span>
                <div className="absolute inset-0 z-0 animate-pulse rounded-full bg-lime-500 opacity-0 transition-opacity duration-500 group-hover:opacity-70"></div>
              </a>
            </div>
            <div className="flex justify-center space-x-6">
              {[
                {
                  href: '#',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  ),
                },
                {
                  href: '#',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 3c0 0-1.03-.26-3.78 1.02A10.37 10.37 0 0012 2.15c-1.39 0-2.75.18-4.01.53C5.5 3.1 4.5 3.3 4.5 3.3a5.07 5.07 0 00-.09 1.77A5.44 5.44 0 002 10.74c0 5.4 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.61V22"></path>
                    </svg>
                  ),
                },
                {
                  href: '#',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  ),
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group rounded-full p-2 transition-transform duration-300 hover:scale-110"
                >
                  <div className="relative z-10 text-gray-400 transition-colors duration-300 group-hover:text-white">
                    {social.icon}
                  </div>
                  <div className="absolute inset-0 z-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-600/20 to-pink-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </a>
              ))}
            </div>
          </div>
        </section>
  )
}

export default ContactUsSection