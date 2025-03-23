const CenterButton = (props) => {
  return (
    <div class="flex flex-col justify-center items-center text-[#c3c9d5] gap-2 cursor-pointer pointer-events-auto">
      <button
        class="transition-all duration-200 p-5 border-2 border-dotted border-white rounded-md text-[#c3c9d5] text-md cursor-pointer pointer-events-auto flex justify-center items-center hover:text-[#e75e69] bg-[#2e2e2e]"
        onClick={(e) => {
          e.stopPropagation();
          props?.toggleSidebar();
        }}
      >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="2.5em"
          width="2.5em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
      <p class="font-bold">Add First Step...</p>
    </div>
  );
};

export default CenterButton;
