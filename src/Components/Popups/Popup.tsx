import ReactDOM from "react-dom";

import CloseButton from "../Buttons/CloseBtn";

interface popUpProps {
  heading: string;
  onClose: () => void;
  children: React.ReactNode;
  show: boolean;
}

const Popup = ({ heading, onClose, children, show }: popUpProps) => {
  if (!show) return null;

  const popuphtml = (
    <>
      <section className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-white border-4 rounded-lg shadow-lg w-96">
          {/* Header */}
          <div className="flex justify-between items-center border-b rounded-t-lg py-2 px-5">
            <h5 className="font-bold">{heading}</h5>
            <CloseButton onClick={onClose} />
          </div>

          {/* Content */}
          <div className="p-5">{children}</div>
        </div>
      </section>

      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-xs z-40"
        onClick={onClose}
      ></div>
    </>
  );

  return ReactDOM.createPortal(popuphtml, document.body);
};

export default Popup;
