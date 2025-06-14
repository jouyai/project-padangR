const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        
        {/* Brand / About */}
        <div>
          <h4 className="text-lg font-semibold mb-3">SecondStyle</h4>
          <p className="text-gray-400">
            Your go-to store for minimalist, trendy, and affordable fashion. Shop the latest arrivals and elevate your everyday look.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline text-gray-300">Home</a></li>
            <li><a href="/products" className="hover:underline text-gray-300">Products</a></li>
            <li><a href="/cart" className="hover:underline text-gray-300">Cart</a></li>
            <li><a href="/login" className="hover:underline text-gray-300">Login</a></li>
          </ul>
        </div>

        {/* Contact / Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
          <p className="text-gray-400 mb-2">Subscribe to our newsletter for latest updates and offers.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-3 py-2 rounded-l bg-white text-black focus:outline-none"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary/90">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-xs py-4 text-gray-500">
        © {new Date().getFullYear()} SecondStyle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
