import React from "react";

const PartnersSection = () => {
  return (
    <section className="bg-black px-6 py-12 text-center text-white" id="partners">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Become a Partner</h2>
        <p className="text-lg mb-6">
          Let’s build the future together. Partner with <strong>e-Spark</strong> and join the movement driving Europe’s energy transition.
        </p>
        <p className="text-lg mb-6">
          If you share our vision for sustainable mobility, smart infrastructure, and tokenized investment —
          <strong> we’re ready to talk.</strong>
        </p>
        <a
          href="#contact"
          className="inline-block bg-cyan-500 text-black px-6 py-3 rounded-full text-lg font-medium hover:bg-cyan-400 transition"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default PartnersSection;
