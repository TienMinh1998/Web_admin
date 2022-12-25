import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const Modal: React.FC<ModalType> = ({
  children,
  visible,
  title,
  closable = true,
  onCancel
}) =>
  visible
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal ">
              <div className="modal-header">
                <div className={`${typeof title === 'string' ? 'font-semibold' : ''}`}>{title}</div>
                {closable && (
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={onCancel}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                )}
              </div>
              <div className="modal-body"> {children} </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
