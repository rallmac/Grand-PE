export default function Footer() {
  return (
    <footer className="solar-footer">
      <div className="solar-container solar-footer-grid">
        <div>
          <img
            src="/assets/images/grand_pe_solar.png"
            alt="Grand-PE Solar"
            style={{ height: 84, width: "auto" }}
          />
          <p>
            Now you can buy premium home appliances with warranty. We deliver
            quality, durability, and trusted performance.
          </p>
        </div>
        <div>
          <h4>Categories</h4>
          <p><a href="/categories?type=promotions">Promotions</a></p>
          <p><a href="/categories?type=refrigerator">Refrigerator</a></p>
          <p><a href="/categories?type=freezer">Freezer</a></p>
          <p><a href="/categories?type=washing-machines">Washing Machines</a></p>
        </div>
        <div>
          <h4>Top Brands</h4>
          <p><a href="/categories?brand=Huawei">Huawei</a></p>
          <p><a href="/categories?brand=Hisense">Hisense</a></p>
          <p><a href="/categories?brand=LG">LG</a></p>
          <p><a href="/categories?brand=Pylontech">Pylontech</a></p>
        </div>
        <div>
          {/*<h4>Contact Us</h4>
          <p><a href="mailto:online@grandpe.com">online@grandpe.com</a></p>
          <p><a href="tel:+2342018884444">+234 201 888 4444</a></p>
        </div>*/}
      </div>
      <div className="solar-container" style={{ marginTop: 18, fontSize: 12 }}>
        © 2026 grand-pe. All rights reserved
      </div>
    </footer>
  );
}