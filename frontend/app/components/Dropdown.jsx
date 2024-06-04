export default function Dropdown({text}) {
  return (
    <div>
      <button
        id="dropdownBgHoverButton"
        data-dropdown-toggle="dropdownBgHover"
        className="focus:outline-none font-medium text-lg text-spurple-300 text-center inline-flex items-center"
        type="button"
      >
        {text+" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownBgHover"
        className="z-10 hidden w-48 bg-white rounded-lg shadow"
      >
        <ul
          className="p-3 space-y-1 text-sm text-gray-700"
          aria-labelledby="dropdownBgHoverButton"
        >
          <li>
            <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
              <input
                checked
                id="checkbox-item-4"
                type="checkbox"
                value=""
                className="w-4 h-4 text-spurple-300 bg-spurple-100 rounded"
              />
              <label
                htmlFor="checkbox-item-4"
                className="w-full ms-2 text-sm font-medium text-spurple-200 rounded "
              >
                All categories
              </label>
            </div>
          </li>
          <li>
            <div className="flex items-center p-2 rounded hover:bg-gray-100 ">
              <input
                checked
                id="checkbox-item-5"
                type="checkbox"
                value=""
                className="w-4 h-4 text-spurple-300 bg-spurple-100 rounded"
              />
              <label
                htmlFor="checkbox-item-5"
                className="w-full ms-2 text-sm font-medium text-spurple-200 rounded "
              >
                Uncategorized
              </label>
            </div>
          </li>
          {/* <li>
            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
              <input
                id="checkbox-item-6"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="checkbox-item-6"
                className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Default checkbox
              </label>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
