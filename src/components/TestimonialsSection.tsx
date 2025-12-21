const testimonials = [
    {
        quote: `Dustin's ability to bridge the gap between complex AI implementation and instructional
      strategy is unmatched. He doesn't just build models; he builds solutions that people can
      actually use and learn from.`,
        title: "Senior Project Manager",
        company: "Leidos",
        icon: "fas fa-user",
    },
    {
        quote: `A rare talent who masters both ISD and Data Science. Dustin's automated workflows saved our
      team hundreds of hours while significantly improving the accuracy of our mission-critical
      training metrics.`,
        title: "Intelligence Technical Lead",
        company: "Federal Partner",
        icon: "fas fa-user-tie",
    },
];

export default function TestimonialsSection() {
    return (
        <section
            id="testimonials"
            style={{ padding: "5rem 0", background: "rgba(47, 129, 247, 0.03)" }}
        >
            <div className="container">
                <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>What Colleagues Say</h2>
                <div className="skills-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="skill-category testimonial-card">
                            <p className="testimonial-text">&ldquo;{testimonial.quote}&rdquo;</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    <i className={testimonial.icon}></i>
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{testimonial.title}</div>
                                    <div style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
                                        {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
