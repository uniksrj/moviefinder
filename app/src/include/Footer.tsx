const Footer = () => {
    const year = new Date().getFullYear();
    return(
        <footer className="bg-gray-900 text-gray-400 p-8 text-center">
        <div className="mb-4">
          <p>Let’s create something amazing together!</p>
          <a href="mailto:hello@uniktech.com" className="text-indigo-400 hover:underline">hello@uniktech.com</a>
        </div>
        <div className="text-sm">
          &copy; {year} UnikTech • Made with ❤️ in LDH
        </div>
      </footer>
    );
};

export default Footer;