import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import { hideModal } from '../../actions/modals';

export function ModalConductor(props) {
  let contentLabel;
  let content;

  if(props.modalType === 'reassign'){

    contentLabel = 'Reassign a Shift';
    content = <div>test reassign</div>;

  } else if (props.modalType === 'edit') {

    contentLabel = 'Edit a Shift';
    content = <div>test edit</div>;

  }

  return (<ReactModal
    isOpen={props.modalType !== null}
    onRequestClose={() => {props.dispatch(hideModal());}}
    contentLabel={contentLabel}
    shouldFocusAfterRender={true}
    shouldCloseOnOverlayClick={false}
    appElement={document.getElementById('root')}
  >
    {content}
  </ReactModal>);
}

const mapStateToProps = state => {
  return {
    modalType : state.modal.modalType
  };
};

export default connect(mapStateToProps)(ModalConductor);