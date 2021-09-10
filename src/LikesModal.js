import React from "react";
import "./LikesModal.css";
import Fade from "@material-ui/core/Fade";
import { Avatar, Modal } from "@material-ui/core";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import CloseIcon from "@material-ui/icons/Close";
import List from "./List";
function LikesModal({ open, onClose, likes }) {
  console.log("likes", likes);
  return (
    <div>
      <Modal open={open} onClose={onClose} className="likesModal">
        <Fade in={open}>
          <div className="likesModal__body">
            <div className="likesModal__top">
              <div className="likesMOdal__top__heading">
                <h4>Reactions</h4>
                <CloseIcon
                  onClick={onClose}
                  className="likesModal__top__closeIcon"
                />
              </div>
              <ThumbUpAltOutlined className="likesModal__top__likeIcon" />
            </div>
            <div className="likesModal__bottom">
              {likes.map(({ id, data }) => (
                <List id={id} data={data} />
              ))}
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default LikesModal;
