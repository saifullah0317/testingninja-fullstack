export default function Price({plan, price}) {
  return (
    <div class="w-full max-w-sm p-4 bg-swhite border border-sgray-200 rounded-lg shadow sm:p-8 dark:bg-sgray-800 dark:border-sgray-700">
      <h5 class="mb-4 text-xl font-medium text-spurple-300">
        {plan} plan
      </h5>
      <div class="flex items-baseline text-spurple-300">
        <span class="text-3xl font-semibold">$</span>
        <span class="text-5xl font-extrabold tracking-tight">{price}</span>
        <span class="ms-1 text-xl font-normal text-sgray-500 dark:text-sgray-400">
          /month
        </span>
      </div>
      <ul role="list" class="space-y-5 my-7">
        <li class="flex items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 text-spurple-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-spurple-300 ms-3">
            2 team members
          </span>
        </li>
        <li class="flex">
          <svg
            class="flex-shrink-0 w-4 h-4 text-spurple-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-spurple-300 ms-3">
            20GB Cloud storage
          </span>
        </li>
        <li class="flex">
          <svg
            class="flex-shrink-0 w-4 h-4 text-spurple-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-spurple-300 ms-3">
            Integration help
          </span>
        </li>
        <li class="flex line-through decoration-sgray-300">
          <svg
            class="flex-shrink-0 w-4 h-4 text-sgray-300 dark:text-sgray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-sgray-300 ms-3">
            Sketch Files
          </span>
        </li>
        <li class="flex line-through decoration-sgray-300">
          <svg
            class="flex-shrink-0 w-4 h-4 text-sgray-300 dark:text-sgray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-sgray-300 ms-3">
            API Access
          </span>
        </li>
        <li class="flex line-through decoration-sgray-300">
          <svg
            class="flex-shrink-0 w-4 h-4 text-sgray-300 dark:text-sgray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-sgray-300 ms-3">
            Complete documentation
          </span>
        </li>
        <li class="flex line-through decoration-sgray-300">
          <svg
            class="flex-shrink-0 w-4 h-4 text-sgray-300 dark:text-sgray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-sgray-300 ms-3">
            24×7 phone & email support
          </span>
        </li>
      </ul>
      <button
        // type="button"
        className="text-swhite bg-primary font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Choose plan
      </button>
    </div>
  );
}
