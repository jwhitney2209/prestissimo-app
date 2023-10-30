import { InformationCircleIcon, BoltIcon } from "@heroicons/react/20/solid";

import SectionTitle from "./SectionTitle";

export default function Announcements() {
  return (
    <>
      <SectionTitle title="Dashboard" />
      {/* Banners */}
      <div className="mt-4">
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                Thank you for joining Prestissimo! We are currently in the early
                alpha phase of this web application. While using this app you
                may experience bugs and other issues. If you do, please report
                them to us so we can fix them as soon as possible. Thank you for
                your patience and understanding.
              </p>
              {/* <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <a
                  href="#"
                  className="whitespace-nowrap font-bold text-blue-700 hover:text-blue-600"
                >
                  Report a bug
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
      {/* Updates */}
      <div className="mt-4">
        <div className="rounded-md bg-gray-100 p-4 divide-y divide-gray-400">
          <div className="flex">
            <div className="flex-shrink-0">
              <BoltIcon className="pt-1 h-5- w-5 text-amber-500" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1">
              <h1 className="text-xl font-semibold">
                07.17.2023 - Prestissimo v0.0.1 Deploys!
              </h1>
              <p className="pt-2 text-sm font-normal">
                Today we were able to successfully deploy our application after
                spending months in development. We are excited to see this
                unravel to benefit music educators everywhere.
                <br />
                <br />
                Prestissimo is currently free while we are in early alpha of the
                release! Enjoy access to features as they roll out and help us
                get bugs worked out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
