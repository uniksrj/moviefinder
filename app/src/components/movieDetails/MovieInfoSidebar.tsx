import React from "react";

interface InfoProps {
  status: string;
  language: string;
  budget: number;
  revenue: number;
}

const MovieInfoSidebar: React.FC<InfoProps> = ({ status, language, budget, revenue }) => {
  return (
    <div className="lg:w-1/4 space-y-2 text-sm text-gray-200">
      <h2 className="text-xl font-semibold mb-2">Movie Info</h2>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Language:</strong> {language.toUpperCase()}</p>
      <p><strong>Budget:</strong> ${budget.toLocaleString()}</p>
      <p><strong>Revenue:</strong> ${revenue.toLocaleString()}</p>
    </div>
  );
};

export default MovieInfoSidebar;
