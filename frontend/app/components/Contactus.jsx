export default function Contactus() {
  return (
    <>
      <span className="text-4xl font-bold text-spurple-300 flex justify-center">
        Contact Us
      </span>
      <div className="h-24"/>
      <div className="flex lg:flex-row md:flex-row flex-col justify-evenly">
        <div className="flex flex-col text-center items-center px-6 mt-5">
          <a href="mailto:saifullaharshad999@gmail.com">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/material-rounded/510173/ios-filled/50/mail.png"
              alt="mail"
            />
          </a>
          <span className="text-spurple-300 text-lg font-bold">Email us:</span>
          <span className="text-spurple-300 text-md font-medium mt-2 mb-2">
            Email us for general queries, including marketing and partnership
            opportunities.
          </span>
          <a href="mailto:saifullaharshad999@gmail.com">
            <span className="text-spurple-300 text-md font-bold">
              saifullaharshad999@gmail.com
            </span>
          </a>
        </div>
        <div className="flex flex-col text-center items-center px-6 mt-5">
          <a href="tel:+923174885429">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/510173/ios-filled/50/phone.png"
              alt="phone"
            />
          </a>
          <span className="text-spurple-300 text-lg font-bold">Call us:</span>
          <span className="text-spurple-300 text-md font-medium mt-2 mb-2">
            Call us to speak to a member of our team. We are always happy to
            help.
          </span>
          <a href="tel:+923174885429">
            <span className="text-spurple-300 text-md font-bold">+923174885429</span>
          </a>
        </div>
        <div className="flex flex-col text-center items-center px-6 mt-5">
          <a href="tel:+923174885429">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/510173/ios-filled/50/technical-support.png"
              alt="phone"
            />
          </a>
          <span className="text-spurple-300 text-lg font-bold">Support:</span>
          <span className="text-spurple-300 text-md font-medium mt-2 mb-2">
            Email us for general queries, including marketing and partnership
            opportunities.
          </span>
          <a href="tel:+923174885429">
            <span className="text-spurple-300 text-md font-bold">+923174885429</span>
          </a>
        </div>
      </div>
    </>
  );
}
