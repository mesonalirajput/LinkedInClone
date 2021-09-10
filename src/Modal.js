import React, { useState } from "react";
import "./Modal.css";
import { Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
// import FileInput from "react-file-input";
import FileInput from "@brainhubeu/react-file-input";
function Modall({ open, onClose, title, subTitle, onDone }) {
  // const [open, setOpen] = React.useState(true);

  const [inputImage, setInputImage] = useState();

  const handleImgChange = ({ value }) => {
    console.log("value: ", value);
    console.log(value.name);
    setInputImage(value);
  };

  // console.log(onDone, "onDone");

  return (
    <div>
      <Modal
        className="modall"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modall__body">
            <div className="modall__top">
              <p>{title}</p>
              <CloseIcon onClick={onClose} className="modall__top__icon" />
            </div>
            <div className="modall__middle">
              <FileInput label={subTitle} onChangeCallback={handleImgChange} />
            </div>
            <div className="modall__bottom">
              <button
                className="modall__done"
                type="submit"
                onClick={() => onDone(inputImage)}
              >
                Done
              </button>
              <button
                className="modall__cancel"
                type="cancel"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Modall;
