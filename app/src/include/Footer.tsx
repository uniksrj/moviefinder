const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 px-4 py-8 text-center space-y-4">
      <div>
        <p className="text-sm md:text-base">Let’s create something amazing together!</p>
        <a
          href="mailto:hello@uniktech.com"
          className="text-indigo-400 hover:underline block text-sm md:text-base"
        >
          hello@uniktech.com
        </a>
      </div>
      <div className="text-xs md:text-sm">
        &copy; {year} UnikTech • Made with ❤️ in LDH
      </div>
    </footer>
  );
};

export default Footer;
