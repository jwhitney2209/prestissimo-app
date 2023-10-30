// eslint-disable-next-line
export default function SectionTitle({ title }) {
  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {title}
        </h3>
      </div>
    </>
  );
}
