import { createSignal } from "solid-js";
import styles from "./styles.module.css";
const NodeComponent = (props) => {
  const [show, setShow] = createSignal(false);
  let upperDivRef = null;
  function handleMouseDownOutput(ref, event, outputIndex) {
    event.stopPropagation();
    const centerX =
      ref.getBoundingClientRect().left +
      Math.abs(
        ref.getBoundingClientRect().right - ref.getBoundingClientRect().left
      ) /
        2;
    const centerY =
      ref.getBoundingClientRect().top +
      Math.abs(
        ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top
      ) /
        2;
  }

  //   function handleMouseEnterInput(ref, inputIndex) {
  //     const centerX =
  //       ref.getBoundingClientRect().left +
  //       Math.abs(
  //         ref.getBoundingClientRect().right - ref.getBoundingClientRect().left
  //       ) /
  //         2;
  //     const centerY =
  //       ref.getBoundingClientRect().top +
  //       Math.abs(
  //         ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top
  //       ) /
  //         2;
  //   }

  //   function handleMouseLeaveInput(inputIndex) {
  //     props.onMouseLeaveInput(props.id, inputIndex);
  //   }
  function handleMouseEnterNode() {
    setShow(true);
  }

  function handleMouseLeaveNode() {
    setTimeout(() => {
      // Only hide if the mouse isn't over the upper div
      if (!upperDivRef || !upperDivRef.matches(":hover")) {
        setShow(false);
      }
    }, 100);
  }

  return (
    <div
      class={
        props.selected
          ? props.name === "aia"
            ? styles.nodeSelected
            : props.name === "gmail"
            ? styles.nodeg
            : styles.nodeSelected
          : props.name === "gmail"
          ? styles.nodeGmail
          : styles.node
      }
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`,
      }}
      onMouseDown={(event) => {
        event.stopPropagation();
        props.onMouseDownNode(props.id, event);
      }}
      onMouseOver={handleMouseEnterNode}
      onMouseLeave={handleMouseLeaveNode}
    >
      {show() && (
        <div
          ref={upperDivRef}
          class="flex items-center gap-5 absolute top-[-50px] right-0  h-8 bg-[#2e2e2e]"
          onMouseEnter={() => setShow(true)} // Prevent hiding when mouse is over upper div
          onMouseLeave={() => setShow(false)} // Hide when the mouse leaves the upper div
        >
          {/* Play Button */}
          <div class="text-[#c3c9d5] hover:text-[#e75e69]">
            <svg
              fill="currentColor"
              stroke-width="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              height="2em"
              width="2em"
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
              height="2em"
              width="2em"
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
              height="1em"
              width="1em"
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
              height="2em"
              width="2em"
              style="overflow: visible; color: currentcolor;"
            >
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>
          </div>
        </div>
      )}
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

      <div class="absolute top-0 right-[-9px] h-full flex flex-col items-center justify-center gap-7 w-[12px]">
        <For each={[...Array(Number(props.numberOutputs)).keys()]}>
          {(_, index) => {
            let outputRef = null;
            return (
              <div class="relative flex ">
                {/* Output Circle */}
                <div
                  ref={outputRef}
                  class="w-[18px] h-[18px] rounded-full bg-[#c3c9d5] hover:bg-[#e75e69] cursor-crosshair pointer-events-auto z-100"
                  onMouseDown={(event) => {
                    handleMouseDownOutput(outputRef, event, index());
                  }}
                ></div>

                {/* Line extending from the center of the output */}
                {props.plusShow ? (
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
                ) : null}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default NodeComponent;
