import "@testing-library/jest-dom";
import Modal from "@/components/(modal)/Modal";
import { render, screen, fireEvent } from "@testing-library/react";
import useModal from "./useModal";

function TestComponent() {
  const { openModal, openToast, openConfirm, closeModal } = useModal();

  return (
    <div>
      <button onClick={() => openModal({ component: <>@ubinquitous</> })}>openModal</button>
      <button onClick={() => openConfirm({ content: "@ubinquitous", onConfirm: () => null })}>
        openConfirm
      </button>
      <button onClick={() => openToast("@ubinquitous")}>openToast</button>
      <button onClick={closeModal}>closeModal</button>
      <Modal />
    </div>
  );
}

describe("useModal", () => {
  it("아무런 동작을 하지 않을 때 아무런 모달도 뜨지 않는다", () => {
    render(<TestComponent />);
    expect(screen.queryByText("@ubinquitous")).not.toBeInTheDocument();
  });

  it("openModal을 호출하면 모달이 사용자 화면에 노출된다", () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByText("openModal"));
    expect(screen.queryByText("@ubinquitous")).toBeInTheDocument();
  });

  it("openModal 호출 후 closeModal을 호출하면 모달이 사라져야 한다", () => {
    render(<TestComponent />);
    fireEvent.click(screen.getByText("openModal"));
    fireEvent.click(screen.getByText("closeModal"));
    expect(screen.queryByText("@ubinquitous")).not.toBeInTheDocument();
  });
});
