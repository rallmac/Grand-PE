import { Link } from "react-router-dom";

export function Testimonials() {
  return(
        <section className="testimonial-preview section-padding">
          <div className="container">
            <h2 className="text-center reveal-on-scroll">What Our Clients Say</h2>
            <div className="testimonial reveal-on-scroll">
              <p>
                Their customer relationship is top notch ,they see that their customers are satisfied 👍🏾👍🏾 
              </p>
              <p>Achimaco Multiple Links</p>
            </div>
            <div className="testimonial reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <p>
                Authentic Jinko panels. Good customer service, I recommend 👍 …
              </p>
              <p>JOSHUA MBAKARA</p>
            </div>
            <div className="testimonial reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <p>
                If you're looking for people you can trust your money to buy good quality solar, look no further!
              </p>
              <p>Gloria Solomon</p>
            </div>
            <div className="testimonial reveal-on-scroll" style={{ transitionDelay: "0.1s" }}>
              <p>
                Highly recommended company for your solar needs with top notch service. Truly professional. You can trust them.
              </p>
              <p>Sola Olatinwo</p>
            </div>
            <div className="text-center reveal-on-scroll" style={{ marginTop: 30 }}>
              <Link to="/about#testimonials" className="btn btn-primary">
                Read More Testimonials
              </Link>
            </div>
          </div>
        </section>
    )
}