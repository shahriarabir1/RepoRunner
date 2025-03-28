import { createSignal } from "solid-js";

import Gmail from "./Gmail";
import AiAgent from "./AIAgent";
const NodeComponent = (props) => {
  const [show, setShow] = createSignal(false);
  let upperDivRef = null;
  // function handleMouseDownOutput(ref, event, outputIndex) {
  //   event.stopPropagation();
  //   const centerX =
  //     ref.getBoundingClientRect().left +
  //     Math.abs(
  //       ref.getBoundingClientRect().right - ref.getBoundingClientRect().left
  //     ) /
  //       2;
  //   const centerY =
  //     ref.getBoundingClientRect().top +
  //     Math.abs(
  //       ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top
  //     ) /
  //       2;
  // }

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
    <div>
      {props.name === "gmail" ? (
        <Gmail
          id={props.id}
          handleMouseEnterNode={handleMouseEnterNode}
          handleMouseLeaveNode={handleMouseLeaveNode}
          onClickDeleteNode={props.onClickDeleteNode}
          numberInputs={props.numberInputs}
          numberOutputs={props.numberOutputs}
          x={props.x}
          y={props.y}
          selected={props.selected}
          onMouseDownNode={props.onMouseDownNode}
          show={show}
          setShow={setShow}
          upperDivRef={upperDivRef}
        />
      ) : props.name === "aia" ? (
        <AiAgent
          id={props.id}
          handleMouseEnterNode={handleMouseEnterNode}
          handleMouseLeaveNode={handleMouseLeaveNode}
          onClickDeleteNode={props.onClickDeleteNode}
          numberInputs={props.numberInputs}
          numberOutputs={props.numberOutputs}
          x={props.x}
          y={props.y}
          selected={props.selected}
          onMouseDownNode={props.onMouseDownNode}
          show={show}
          setShow={setShow}
          upperDivRef={upperDivRef}
          others={props.others}
        />
      ) : null}
    </div>
  );
};

export default NodeComponent;
