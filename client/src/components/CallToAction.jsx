import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Work Less. Do More.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
            Manage your program like never before. With Prestissimo you can
            spend more time making music and less time on inventory, fundraising, and uniforms.

          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/signup"
              className="rounded-md outline outline-offset-0 outline-1 hover:outline-gray-50 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-transparent hover:text-gray-50 hover:outfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Sign Up
            </Link>
            <a
              href="#about"
              className="text-sm font-semibold leading-6 text-white"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#d6d475" />
                <stop offset={1} stopColor="#d97706" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
