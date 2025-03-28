const AiAgent = (props) => {
  return (
    <div
      class="flex flex-col p-4 cursor-pointer absolute"
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onMouseOver={props.handleMouseEnterNode}
      onMouseLeave={props.handleMouseLeaveNode}
      onMouseDown={(event) => {
        //prevent Click on board
        event.stopPropagation();

        props.onMouseDownNode(props.id, event);
      }}
    >
      <div
        class={
          props.selected
            ? "flex  justify-center bg-[#404142] border-[2px] border-[#ff616e] rounded-l-lg rounded-r-lg shadow-[1px_1px_11px_-6px_rgba(0,0,0,0.75)] outline-[8px] outline-[#6d6b68c5] select-none z-10 transition-[border,box-shadow] ease-in duration-200 w-[270px] h-[100px]"
            : "flex justify-center  bg-[#404142] border-[2px] border-[#ff616e] rounded-l-lg rounded-r-lg shadow-[1px_1px_11px_-6px_rgba(0,0,0,0.75)] select-none z-10 transition-[border,box-shadow] ease-in duration-200 w-[270px] h-[100px]"
        }
        onMouseDown={(event) => {
          event.stopPropagation();
          props.onMouseDownNode(props.id, event);
        }}
      >
        <div class="absolute top-0 left-3 h-full flex flex-col items-center justify-center gap-3 w-[12px] pointer-events-none">
          <For each={[...Array(Number(props.numberInputs)).keys()]}>
            {(_, index) => {
              let inputRef = null;
              return (
                <div
                  ref={inputRef}
                  class="w-[10px] h-[25px]  bg-[#c3c9d5] cursor-crosshair pointer-events-auto hover:bg-[#e75e69]"
                  // onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                  // onMouseLeave={() => handleMouseLeaveInput(index())}
                ></div>
              );
            }}
          </For>
        </div>
        <div class="flex  items-center w-full h-full text-white gap-x-6 ml-10">
          <svg
            class="svg-inline--fa fa-robot fa-w-20"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="robot"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            style="width: 50px; height: 50px; max-width: none;"
          >
            <path
              fill="currentColor"
              d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"
            ></path>
          </svg>

          <div class="flex flex-col gap-1">
            <p
              class="text-3 font-sans font-semibold"
              style="font-family: 'Open Sans', sans-serif;"
            >
              AI Agent
            </p>
            <p
              class="text-3 font-sans text-[#a49e9c]"
              style="font-family: 'Open Sans', sans-serif;"
            >
              Tools Agent
            </p>
          </div>
          {props.others && (
            <div class="flex">
              {/* model */}
              {props.others.model && (
                <div>
                  <div
                    class="absolute bottom-1.5 left-1/5 transform -translate-x-1/2 cursor-pointer z-100 text-[#8c8ea6] hover:text-[#e75e69]"
                    onClick={props.onClickDeleteNode}
                  >
                    <svg
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      height="1.5em"
                      width="1.5em"
                      style="overflow: visible; color: currentcolor;"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                      ></path>
                    </svg>
                  </div>
                  <div class="w-[2px] h-[60px] bg-[#c3c9d5] absolute bottom-[-42px] left-1/5 transform -translate-x-1/2 z-1"></div>
                  <div class="flex gap-1 bg-[#2e2e2e] absolute bottom-[-16px] left-1/5 transform -translate-x-1/2 z-100 text-[#c3c9d5] text-[12px]">
                    Chat Model <span class="text-red-500 font-bold">*</span>
                  </div>
                  <button
                    class="absolute bottom-[-70px] left-[45px] cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      props.toggleSidebar();
                    }}
                  >
                    <svg
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      height="2em"
                      width="2em"
                      style="overflow: visible; color: currentcolor;"
                    >
                      <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                    </svg>
                  </button>
                </div>
              )}

              {/* memory and tool */}
              {props.others.memory && (
                <div>
                  {/* memory */}
                  <div class="flex justify-center">
                    <div
                      class="absolute bottom-1 right-24.5 transform -translate-x-1/2 cursor-pointer z-100 text-[#8c8ea6] hover:text-[#e75e69] "
                      onClick={props.onClickDeleteNode}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        height="1.5em"
                        width="1.5em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                        ></path>
                      </svg>
                    </div>
                    <div class="w-[2px] h-[60px] bg-[#c3c9d5] absolute right-30 bottom-[-42px] transform -translate-x-1/2 z-1"></div>
                    <div class="bg-[#2e2e2e] absolute bottom-[-17px] right-20 transform -translate-x-1/2 z-100 text-[#c3c9d5] text-[12px]">
                      Memory
                    </div>
                    <button
                      class="absolute right-26.5 bottom-[-72px] cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.toggleSidebar();
                      }}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        height="2em"
                        width="2em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Tool */}
                  <div>
                    <div
                      class="absolute bottom-1.5  transform -translate-x-1/2 cursor-pointer z-100 text-[#8c8ea6] hover:text-[#e75e69] "
                      onClick={props.onClickDeleteNode}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        height="1.5em"
                        width="1.5em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435z"
                        ></path>
                      </svg>
                    </div>
                    <div class="w-[2px] h-[60px] bg-[#c3c9d5] absolute bottom-[-42px] transform -translate-x-1/2 z-1"></div>
                    <div class="bg-[#2e2e2e] absolute bottom-[-18px] right-[42px] transform -translate-x-1/2 z-100 text-[#c3c9d5] text-[12px]">
                      Tool
                    </div>
                    <button
                      class="absolute bottom-[-72px] right-12 cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.toggleSidebar();
                      }}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        height="2em"
                        width="2em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div class="absolute top-0.5 right-3 h-full flex flex-col items-center justify-center gap-7 w-[12px]">
          <For each={[...Array(Number(props.numberOutputs)).keys()]}>
            {(_, index) => {
              let outputRef = null;
              return (
                <div class="relative flex ">
                  {/* Output Circle */}
                  <div
                    ref={outputRef}
                    class="w-[18px] h-[18px] rounded-full bg-[#c3c9d5] hover:bg-[#e75e69] cursor-crosshair pointer-events-auto z-100"
                    // onMouseDown={(event) => {
                    //   handleMouseDownOutput(outputRef, event, index());
                    // }}
                  ></div>
                  {/* Line extending from the center of the output */}

                  <div>
                    <div class="ml-[25px] w-[60px] h-[2px] bg-[#c3c9d5] absolute top-[50%] left-1/2 transform -translate-x-1/2 z-50"></div>
                    <button
                      class="absolute top-[-25%] left-15 cursor-pointer z-100 text-[#c3c9d5] hover:text-[#e75e69] rounded-md"
                      onMouseDown={(event) => {
                        handleMouseDownOutput(outputRef, event, index());
                      }}
                    >
                      <svg
                        fill="currentColor"
                        stroke-width="0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        height="2em"
                        width="2em"
                        style="overflow: visible; color: currentcolor;"
                      >
                        <path d="M64 80c-8.8 0-16 7.2-16 16v320c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96c0-35.3 28.7-64 64-64h320c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 248v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
      {props.show() && (
        <div
          ref={props.upperDivRef}
          class="flex items-center gap-2 absolute top-[-30px] h-8 bg-[#2e2e2e]"
          onMouseEnter={() => props.setShow(true)}
          onMouseLeave={() => props.setShow(false)}
        >
          {/* Play Button */}
          <div class="text-[#c3c9d5] hover:text-[#e75e69]">
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              height="1.5em"
              width="1.5em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
            </svg>
          </div>
          {/* Run Button */}
          <div class="text-[#c3c9d5]  hover:text-[#e75e69]">
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              baseProfile="tiny"
              version="1.2"
              viewBox="0 0 24 24"
              height="1.5em"
              width="1.5em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M11.5 18.573a6.46 6.46 0 0 1-4.596-1.903C5.677 15.442 5 13.81 5 12.073s.677-3.369 1.904-4.597A.999.999 0 1 1 8.318 8.89C7.468 9.741 7 10.871 7 12.073s.468 2.333 1.318 3.183c.85.85 1.979 1.317 3.182 1.317s2.332-.468 3.182-1.317c.851-.85 1.318-1.98 1.318-3.183s-.468-2.333-1.318-3.183a.999.999 0 1 1 1.414-1.414C17.323 8.705 18 10.337 18 12.073s-.677 3.369-1.904 4.597a6.46 6.46 0 0 1-4.596 1.903zm0-7.573a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1z"></path>
            </svg>
          </div>
          {/* Delete Button */}
          <div
            class="text-[#c3c9d5]  hover:text-[#e75e69]"
            onClick={props.onClickDeleteNode}
          >
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="0.8em"
              width="0.8em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M135.2 17.7 128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </div>
          {/* Menu Button */}
          <div class="text-[#c3c9d5]  hover:text-[#e75e69]">
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="1.5em"
              width="1.5em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAgent;
