import React from 'react';
const services = [
    {
        title: "Web Development",
        description: "Custom websites and web apps built with modern technologies like React, Node.js, and Tailwind CSS.",
        icon: "🌐",
    },
    {
        title: "UI/UX Design",
        description: "Beautiful, user-friendly interface designs that enhance engagement and improve conversion rates.",
        icon: "🎨",
    },
    {
        title: "SEO Optimization",
        description: "Improve your website’s visibility with expert on-page and technical SEO practices.",
        icon: "🚀",
    },
];
const Services = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
            <div className="grid md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="text-4xl mb-4">{service.icon}</div>
                        <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;