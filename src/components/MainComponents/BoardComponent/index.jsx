import { createSignal, onCleanup, onMount } from "solid-js";
import CenterButton from "../ButtonComponent/CenterButton";
import ButtonComponent from "../ButtonComponent";
import SidebarNode from "../../Common/SidebarNode";
import ZoomButton from "../ButtonComponent/ZoomButton";

const BoardComponent = () => {
  let containerRef;
  const [ctrlPressed, setCtrlPressed] = createSignal(false);
  const [spacePressed, setSpacePressed] = createSignal(false);
  const [zoomLevel, setZoomLevel] = createSignal(1);
  const [sidebarVisible, setSidebarVisible] = createSignal(false);
  const [nodes, setNodes] = createSignal([]);
  const zoomIn = () => setZoomLevel((z) => Math.min(z * 1.2, 3));
  const zoomOut = () => setZoomLevel((z) => Math.max(z / 1.2, 0.8));
  const zoomToFit = () => {
    // Implement logic to adjust zoom to fit nodes
    setZoomLevel(1);
  };
  const resetZoom = () => setZoomLevel(1);
  onMount(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Control") {
        setCtrlPressed(true);
      }
      if (event.key === " ") {
        event.preventDefault(); // Prevent scrolling when spacebar is pressed
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "Control") {
        event.preventDefault();
        setCtrlPressed(false);
      }
      if (event.key === " ") {
        setSpacePressed(false);
      }
    };

    const handleWheel = (event) => {
      if (ctrlPressed() || spacePressed()) {
        event.preventDefault(); // Prevent default browser zoom
        if (event.deltaY < 0) {
          zoomIn(); // Scroll up → Zoom in
        } else {
          zoomOut(); // Scroll down → Zoom out
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("wheel", handleWheel, { passive: false });

    onCleanup(() => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    });
  });
  const toggleSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };
  function handleOnClickAdd(numberInputs, numberOutputs, others, name) {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;

    const [nodePrev, setNodePrev] = createSignal({ x: randomX, y: randomY });
    const [nodeCurr, setNodeCurr] = createSignal({ x: randomX, y: randomY });
    // const [inputsEdgesIds, setInputsEdgesIds] = createSignal([]);
    // const [outputsEdgesIds, setOutputsEdgesIds] = createSignal([]);

    setNodes([
      ...nodes(),
      {
        id: `node_${Math.random().toString(36).substring(2, 8)}`,
        numberInputs: numberInputs,
        numberOutputs: numberOutputs,
        prevPosition: { get: nodePrev, set: setNodePrev },
        currPosition: { get: nodeCurr, set: setNodeCurr },
        // inputEdgeIds: { get: inputsEdgesIds, set: setInputsEdgesIds },
        // outputEdgeIds: { get: outputsEdgesIds, set: setOutputsEdgesIds },
        name: name,
        others: others,
      },
    ]);
  }
  const clickAddNodeHandler = (e, input, output, others, name) => {
    e.stopPropagation();
    handleOnClickAdd(input, output, others, name);
  };
  return (
    <div
      ref={containerRef}
      id="boardWrapper"
      class="w-screen z-0 h-screen overflow-hidden flex flex-col items-center justify-center bg-[radial-gradient(circle,#6b6b6b_1.3px,transparent_0px)] bg-[#2e2e2e] bg-[size:30px_30px]"
    >
      {/* Top Right "+" Button */}
      <div class="w-full flex justify-end p-4">
        <ButtonComponent
          setSidebarVisible={setSidebarVisible}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
          sidebarVisible={sidebarVisible}
        />
        <SidebarNode
          setSidebarVisible={setSidebarVisible}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
          sidebarVisible={sidebarVisible}
          clickAddNodeHandler={clickAddNodeHandler}
        />
      </div>

      {/* Board Content */}
      <div
        class={`relative flex items-center justify-center w-screen h-full bg-[radial-gradient(circle,#6b6b6b_1.3px,transparent_0px)] bg-[#2e2e2e] bg-[size:30px_30px] ${
          ctrlPressed() || spacePressed() ? "cursor-grabbing" : "cursor-auto"
        }`}
        style={{
          transform: `scale(${zoomLevel()})`,
          transformOrigin: "center",
        }}
        onClick={closeSidebar}
      >
        {nodes().length === 0 ? (
          <CenterButton toggleSidebar={toggleSidebar} />
        ) : null}
      </div>
      <ZoomButton
        zoomIn={zoomIn}
        zoomToFit={zoomToFit}
        zoomOut={zoomOut}
        zoomLevel={zoomLevel()}
        resetZoom={resetZoom}
      />
    </div>
  );
};

export default BoardComponent;
