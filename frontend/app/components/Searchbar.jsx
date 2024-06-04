export default function Searchbar() {
  return (
    <div>
      <form>
        <div class="flex">
          <label
            for="search-dropdown"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Your Email
          </label>
          <div class="relative w-full">
            <input
            //   type="search"
              id="search-dropdown"
              class="block p-2 w-full z-20 text-md font-medium text-spurple-300 rounded-lg focus:outline-none border border-spurple-300"
            //   placeholder="Search Mockups, Logos, Design Templates..."
              required
            />
            <button
            //   type="submit"
              class="absolute top-0 end-0 p-2 text-md font-medium h-full text-swhite bg-spurple-300 rounded-e-lg border border-spurple-300"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
