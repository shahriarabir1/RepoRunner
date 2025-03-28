

const Gmail = (props) => {
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
            ? "flex  justify-center bg-[#404142] border-[3px] border-[#c3c9d5] rounded-l-4xl rounded-r-lg shadow-[1px_1px_11px_-6px_rgba(0,0,0,0.75)] outline-[8px] outline-[#6d6b68c5] select-none z-10 transition-[border,box-shadow] ease-in duration-200 w-[100px] h-[100px]"
            : "flex justify-center  bg-[#404142] border-[3px] border-[#c3c9d5] rounded-l-4xl rounded-r-lg shadow-[1px_1px_11px_-6px_rgba(0,0,0,0.75)] select-none z-10 transition-[border,box-shadow] ease-in duration-200 w-[100px] h-[100px]"
        }
        onMouseDown={(event) => {
          event.stopPropagation();
          props.onMouseDownNode(props.id, event);
        }}
      >
        <div class="absolute top-0 left-[-9px] h-full flex flex-col items-center justify-center gap-3 w-[12px] pointer-events-none">
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
        <div class="flex justify-center items-center w-1/2 h-full text-white">
          <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="4em"
            width="4em"
            style="overflow: visible; color: currentcolor;"
          >
            <path
              fill="currentColor"
              d="M10.001 14.676v-.062c0-2.508 2.017-4.618 4.753-5.233-.364-2.302-2.794-4.18-5.853-4.18-3.32 0-5.9 2.213-5.9 4.779 0 .969.36 1.9 1.04 2.698.032.038.083.094.152.165a3.568 3.568 0 0 1 1.002 2.238 3.613 3.613 0 0 1 2.363-.442c.166.026.302.046.405.06a7.253 7.253 0 0 0 2.038-.023Zm.457 1.951a9.204 9.204 0 0 1-2.753.055 18.997 18.997 0 0 1-.454-.066 1.613 1.613 0 0 0-1.08.211l-1.904 1.148a.806.806 0 0 1-.49.117.791.791 0 0 1-.729-.851l.15-1.781a1.565 1.565 0 0 0-.439-1.223 5.558 5.558 0 0 1-.241-.262c-.954-1.12-1.517-2.502-1.517-3.995 0-3.745 3.537-6.78 7.9-6.78 4.06 0 7.403 2.627 7.85 6.008 3.371.154 6.05 2.515 6.05 5.406 0 1.193-.456 2.296-1.229 3.19-.051.06-.116.13-.195.21a1.24 1.24 0 0 0-.356.977l.121 1.422a.635.635 0 0 1-.59.68.66.66 0 0 1-.396-.094l-1.544-.917a1.322 1.322 0 0 0-.874-.169c-.147.023-.27.04-.368.053-.316.04-.64.062-.969.062-2.694 0-4.998-1.408-5.943-3.4Zm6.977 1.31a3.326 3.326 0 0 1 1.675.174 3.25 3.25 0 0 1 .842-1.501c.05-.051.087-.09.106-.113.489-.565.743-1.213.743-1.883 0-1.804-1.903-3.414-4.4-3.414-2.497 0-4.4 1.61-4.4 3.414s1.903 3.414 4.4 3.414a5.6 5.6 0 0 0 .714-.045c.08-.01.188-.026.32-.046Z"
            ></path>
          </svg>
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

export default Gmail;
