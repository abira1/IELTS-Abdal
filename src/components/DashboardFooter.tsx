import { MapPin, Phone, Mail, Facebook, Youtube, Heart } from 'lucide-react';

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 pt-12 border-t border-slate-200">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* About Section */}
        <div className="lg:col-span-1 animate-fadeInUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <h3 className="text-lg font-bold text-midnight-800 mb-3">IELTS Abdal</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Your trusted partner in IELTS success. We provide comprehensive exam preparation, expert guidance, and personalized coaching to help you achieve your target band score.
          </p>
          <div className="text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-forest-600 font-bold">⏰</span>
              <span><strong>Saturday - Thursday:</strong> 10:00 AM - 6:00 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-forest-600 font-medium mt-3">
            <Heart className="w-4 h-4 fill-current" />
            Committed to your success
          </div>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h4 className="text-sm font-bold text-midnight-800 uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#exams" className="text-sm text-slate-600 hover:text-forest-600 transition-colors">My Exams</a></li>
            <li><a href="#results" className="text-sm text-slate-600 hover:text-forest-600 transition-colors">My Results</a></li>
            <li><a href="#performance" className="text-sm text-slate-600 hover:text-forest-600 transition-colors">Performance</a></li>
            <li><a href="/" className="text-sm text-slate-600 hover:text-forest-600 transition-colors">Back to Home</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <h4 className="text-sm font-bold text-midnight-800 uppercase tracking-wider mb-4">Contact Us</h4>
          <div className="space-y-3">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-slate-600">01792325203</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
              <p className="text-slate-600 text-sm break-all hover:text-forest-600 transition-colors">
                <a href="mailto:amieltsabdal@gmail.com">amieltsabdal@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <h4 className="text-sm font-bold text-midnight-800 uppercase tracking-wider mb-4">Locations</h4>
          <div className="space-y-3">
            {/* Main Location */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-forest-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-slate-700">Our Location</p>
                <p className="text-slate-600 text-xs leading-relaxed">Millennium Shopping Complex, Lift-7, Zindabazar, Sylhet</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-gradient-to-r from-forest-50 to-emerald-50 rounded-2xl border border-forest-100 px-6 md:px-8 py-6 mb-8 animate-fadeInUp" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-sm font-bold text-midnight-800 uppercase tracking-wider mb-1">Follow Us</h4>
            <p className="text-xs text-slate-600">Stay updated with our latest content and announcements</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/17cVmXoL52/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-forest-100 hover:border-forest-600 hover:bg-forest-600 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5 text-forest-600 group-hover:text-white transition-colors" />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@ieltsabdal_11k?si=3BvaPsZujRwKkbmz"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-forest-100 hover:border-red-600 hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
              aria-label="Subscribe to us on YouTube"
            >
              <Youtube className="w-5 h-5 text-forest-600 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-slate-200 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            <p>&copy; {currentYear} <span className="font-semibold text-slate-700">IELTS Abdal</span>. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-forest-600 transition-colors">Privacy Policy</a>
            <span className="text-slate-300">•</span>
            <a href="#" className="hover:text-forest-600 transition-colors">Terms of Service</a>
            <span className="text-slate-300">•</span>
            <a href="#" className="hover:text-forest-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
