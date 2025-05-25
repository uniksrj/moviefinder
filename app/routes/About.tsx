const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About Me</h1>

      <p className="text-lg mb-6">
        Hi! I'm <span className="font-semibold">uniksrj</span>, a passionate developer and tech enthusiast. I love building modern web applications that are clean, efficient, and user-friendly.
      </p>

      <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-2">👤 Profile</h2>
        <ul className="text-lg space-y-2">
          <li><strong>Name:</strong> uniksrj</li>
          <li><strong>Role:</strong> CEO & Full-Stack Developer</li>
          <li><strong>Email:</strong> <a href="mailto:uniksrj@gmail.com" className="text-blue-700 underline">uniksrj@gmail.com</a></li>
          <li><strong>Based in:</strong> Planet Earth 🌍</li>
        </ul>
      </div>

      <div className="border-t pt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Always learning. Always building. Let’s create something great together.</p>
      </div>
    </div>
  );
};

export default About;
