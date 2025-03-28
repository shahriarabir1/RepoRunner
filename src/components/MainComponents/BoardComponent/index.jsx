import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import CenterButton from "../ButtonComponent/CenterButton";
import ButtonComponent from "../ButtonComponent";
import SidebarNode from "../../Common/SidebarNode";
import ZoomButton from "../ButtonComponent/ZoomButton";
import NodeComponent from "../../NodeComponent";

const BoardComponent = () => {
  let containerRef;
  const [ctrlPressed, setCtrlPressed] = createSignal(false);
  const [spacePressed, setSpacePressed] = createSignal(false);
  const [zoomLevel, setZoomLevel] = createSignal(1);
  const [sidebarVisible, setSidebarVisible] = createSignal(false);
  const [nodes, setNodes] = createSignal([]);
  const [selectedNode, setSelectedNode] = createSignal(null);
  const [clickedPosition, setClickedPosition] = createSignal({ x: -1, y: -1 });
  const [translatePosition, setTranslatePosition] = createSignal({
    x: 0,
    y: 0,
  });
  const [isDraggingNode, setIsDraggingNode] = createSignal(false);

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
    const randomX = (Math.random() * (0.4 - -0.4) + -0.4) * window.innerWidth;
    const randomY = (Math.random() * (0.4 - -0.4) + -0.4) * window.innerHeight;
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
  createEffect(() => {
    console.log(nodes());
  });
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const nodeData = JSON.parse(data);
      clickAddNodeHandler(
        e,
        nodeData.data[0],
        nodeData.data[1],
        nodeData.data[2],
        nodeData.data[3]
      );
      closeSidebar();
    }
  };
  function handleOnMouseDownNode(id, event) {
    setSelectedNode(id);
    setIsDraggingNode(true);
    setClickedPosition({ x: event.clientX, y: event.clientY });
    const node = nodes().find((node) => node.id === id);
    if (node) {
      node.prevPosition.set({
        x: node.currPosition.get().x * zoomLevel(),
        y: node.currPosition.get().y * zoomLevel(),
      });
    }
  }
  const handleOnMouseDown = (event) => {
    setSelectedNode(null);
    setClickedPosition({ x: event.clientX, y: event.clientY });
  };
  const handleOnClickDelete = () => {
    // const node = nodes().find((node) => node.id === selectedNode());
    // if (!node) {
    //   setSelectedNode(null);
    //   return;
    // }
    setNodes([...nodes().filter((node) => node.id !== selectedNode())]);
    setSelectedNode(null);
  };
  function handleOnMouseMove(event) {
    if (isDraggingNode() && selectedNode() !== null) {
      // Dragging a node
      const deltaX = (event.clientX - clickedPosition().x) / zoomLevel();
      const deltaY = (event.clientY - clickedPosition().y) / zoomLevel();

      const node = nodes().find((node) => node.id === selectedNode());
      if (node) {
        node.currPosition.set({
          x: node.prevPosition.get().x + deltaX,
          y: node.prevPosition.get().y + deltaY,
        });
      }
    } else if ((ctrlPressed() || spacePressed()) && clickedPosition().x >= 0) {
      // Panning the board
      const deltaX = event.clientX - clickedPosition().x;
      const deltaY = event.clientY - clickedPosition().y;

      setTranslatePosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setClickedPosition({ x: event.clientX, y: event.clientY });
    }

    // if (newEdge() !== null) {
    //   const boardWrapperElement = document.getElementById("boardWrapper");
    //   if (boardWrapperElement) {
    //     newEdge()?.currEndPosition.set({
    //       x: (event.x + boardWrapperElement.scrollLeft) / scale(),
    //       y: (event.y + +boardWrapperElement.scrollTop) / scale(),
    //     });
    //   }
    // }
  }
  const handleOnMouseUpBoard = () => {
    setClickedPosition({ x: -1, y: -1 });
    setIsDraggingNode(false);
  };
  return (
    <div
      ref={containerRef}
      id="boardWrapper"
      class="w-screen z-0 h-screen overflow-hidden flex flex-col items-center justify-center bg-[radial-gradient(circle,#6b6b6b_1.3px,transparent_0px)] bg-[#2e2e2e] bg-[size:30px_30px]"
    >
      {/* Top Right "+" Button */}
      <div class="absolute w-full flex justify-end p-4 top-0">
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
        class={`flex items-center justify-center w-[400%] h-[400%]  ${
          ctrlPressed() || spacePressed() ? "cursor-grabbing" : "cursor-auto"
        }`}
        style={{
          transform: `translate(${translatePosition().x}px, ${
            translatePosition().y
          }px) scale(${zoomLevel()})`,
          transformOrigin: "center",
        }}
        onClick={closeSidebar}
        onDragOver={(e) => e.preventDefault()} // Required for dropping
        onDrop={handleDrop}
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        onMouseUp={handleOnMouseUpBoard}
      >
        <For each={nodes()}>
          {(node) => (
            <NodeComponent
              id={node.id}
              x={node.currPosition.get().x}
              y={node.currPosition.get().y}
              numberInputs={node.numberInputs}
              numberOutputs={node.numberOutputs}
              selected={selectedNode() === node.id}
              onMouseDownNode={handleOnMouseDownNode}
              // onMouseDownOutput={handleOnMouseDownOutput}
              // onMouseEnterInput={handleOnMouseEnterInput}
              // onMouseLeaveInput={handleOnMouseLeaveInput}
              onClickDeleteNode={handleOnClickDelete}
              name={node.name}
              setSidebarVisible={setSidebarVisible}
              toggleSidebar={toggleSidebar}
              sidebarVisible={sidebarVisible}
              others={node.others}
              // edge={newEdge()}
              // edges={edges()}
              // plusShow={plusShow}
            />
          )}
        </For>
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
