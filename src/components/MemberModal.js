import React, { useState } from "react";

function MemberModal(props) {
  return (
    <div
      className="info-modal"
      style={{ display: props.showModal ? "block" : "none" }}
    >
      <div className="info-modal-content">
        <h1>{props.member?.value?.nameDisplayAs}</h1>
        <div className="row">
          <div className="column">
            <img
              className="member-portrait"
              src={props.member?.value?.thumbnailUrl}
            />
          </div>
          <div className="column">
            <div>Title: {props.member?.value?.nameFullTitle}</div>
            <div>
              Seat: {props.member?.value?.latestHouseMembership.membershipFrom}
            </div>
            <div>Party: {props.member?.value?.latestParty.name}</div>
          </div>
        </div>
        <button className="close-button" onClick={props.onDetailsCloseClick}>
          {" "}
          x{" "}
        </button>
      </div>
    </div>
  );
}

export default MemberModal;
