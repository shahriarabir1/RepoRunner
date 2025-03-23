import { createSignal } from "solid-js";
import SidebarNode from "../../Common/SidebarNode";

const ButtonComponent = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);
  return (
    <div
      class="flex flex-col items-center justify-center gap-2 z-[300] pointer-events-none box-border "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        class="transition-all border-1 border-white hover:border-[#e75e69] p-3 duration-200 rounded-md text-white text-2xl cursor-pointer pointer-events-auto flex justify-center items-center hover:text-[#e75e69]"
        onClick={props?.toggleSidebar}
      >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="0.9em"
          width="0.9em"
          style="overflow: visible; color: currentcolor;"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
      <div
        class={isHovered() ? "opacity-100 pointer-events-auto" : "opacity-0"}
      >
        <button
          class="transition-all duration-200 border-1 border-white hover:border-[#e75e69] p-3 rounded-md text-white text-2xl cursor-pointer pointer-events-auto  hover:text-[#e75e69]"
          onClick={props.toggleSidebar}
        >
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="0.5em"
            width="0.5em"
            style="overflow: visible; color: currentcolor;"
          >
            <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h224v-80c0-17.7 14.3-32 32-32h80V96c0-8.8-7.2-16-16-16H64zm224 400H64c-35.3 0-64-28.7-64-64V96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v229.5c0 17-6.7 33.3-18.7 45.3l-90.5 90.5c-12 12-28.3 18.7-45.3 18.7H288z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ButtonComponent;
