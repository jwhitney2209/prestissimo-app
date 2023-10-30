import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

import prestissimo_logo from "../assets/prestissimo_logo.svg";

const navigation = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900">
      <nav
        className="mx-auto max-w-7xl flex items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Prestissimo</span>
            <img src={prestissimo_logo} className="h-14 w-auto" alt="logo" />
          </Link>
        </div>
        {/* NavMenu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base text-gray-50 font-medium hover:text-gray-400"
            >
              {item.name}
            </a>
          ))}
        </div>
        {/* Sign Up/Login */}
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <Link
            to="/signin"
            className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 text-gray-50"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-md outline outline-offset-0 outline-1 hover:outline-gray-50 bg-gray-50 hover:bg-transparent hover:text-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Sign Up
          </Link>
        </div>
        {/* Mobile Menu Corner */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center gap-x-6">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Prestissimo</span>
                <img src={prestissimo_logo} className="h-14 w-auto" alt="logo" />
              </Link>
              <Link
                to="/signup"
                className="ml-auto rounded-md bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="my-6 gap">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-50 hover:bg-gray-800"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/signin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-50 hover:bg-gray-800"
                >
                  Login
                </Link>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </nav>
    </header>
  );
}
