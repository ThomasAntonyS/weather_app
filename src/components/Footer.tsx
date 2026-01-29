const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center py-6 border-t border-gray-200 mt-10">
      <p className="text-sm sm:text-base text-white font-medium">
        © {currentYear} All rights reserved.
      </p>

      <p className="text-sm sm:text-base font-bold mt-2 sm:mt-0">
        Developed by - 
        <a 
          href="https://thomasantony.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-1 text-blue-400"
        >
          Thomas Antony S
        </a>
      </p>
    </footer>
  );
};

export default Footer;