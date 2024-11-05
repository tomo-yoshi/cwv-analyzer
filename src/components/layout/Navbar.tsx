import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600">
                Core Web Vitals Analyzer
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/tbt-inspector"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              TBT Inspector
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 