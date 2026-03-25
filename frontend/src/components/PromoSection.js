'use client'

const whatsappMobile = '/assets/images/whatsapp-contact-mobile.png'
const whatsappDesktop = '/assets/images/whatsapp-contact-desktop.png'
const whatsappBig = '/assets/images/whatsapp-contact-big-screen.png'

export default function PromoSection() {
  return (
    <section className="w-full bg-white border-t">
      <div className="mx-auto max-w-[1440px]">
        <a
          href="https://wa.me/2348064013822"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity transition-transform duration-200 hover:scale-[1.03]"
        >
          {/* Mobile Image */}
          <div className="block md:hidden">
            <img src={whatsappMobile} alt="Fast delivery, free shipping, item warranty" className="w-full h-auto" />
          </div>
          
          {/* Desktop Image */}
          <div className="hidden md:block lg:hidden">
            <img src={whatsappDesktop} alt="Fast delivery, free shipping, item warranty" className="w-full h-auto" />
          </div>
          
          {/* Big Screen Image */}
          <div className="hidden lg:block">
            <img src={whatsappBig} alt="Fast delivery, free shipping, item warranty" className="w-full h-auto" />
          </div>
        </a>
      </div>
    </section>
  )
}
