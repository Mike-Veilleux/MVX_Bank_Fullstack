import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
type PRivateProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  body: string;
  date: string | null;
  color: string;
};
const MvxToasts = ({
  show,
  setShow,
  title,
  body,
  color,
  date,
}: PRivateProps) => {
  return (
    <ToastContainer className="p-3" position={"top-end"}>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={5000}
        autohide
        bg={color}
      >
        <Toast.Header>
          <strong className="me-auto">{`MVX Bank ${title}`}</strong>
          {date !== null && <small>{date}</small>}
        </Toast.Header>
        <Toast.Body className="text-white">{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MvxToasts;
