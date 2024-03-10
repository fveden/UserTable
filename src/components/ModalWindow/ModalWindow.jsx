import "./modalWindow.css";
/**
 * active: boolean;
 * setActive: Dispatch<SetStateAction<boolean>>;
 * onLeaving?: () => void;
 * children: React.ReactNode;
 */
function ModalWindow({ active, setActive, children, onLeaving }) {
  return (
    <div
      className={active ? "modal-window active" : "modal-window"}
      onClick={() => {
        if (onLeaving) {
          onLeaving();
        }
        setActive(false);
      }}
    >
      <div
        className={
          active ? "modal-window__content active" : "modal-window__content"
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalWindow;
