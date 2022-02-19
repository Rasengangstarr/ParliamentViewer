import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import MemberModal from "./MemberModal";

export default function MemberList(props) {
  const [Members, fetchMembers] = useState([]);
  const [FilteredMembers, applyFilterToMembers] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [SelectedMember, setSelectedMember] = useState({});

  function handleDetailsClick(evt) {
    setSelectedMember(FilteredMembers[evt.target.value]);
    setShowModal(true);
  }

  function closeDetailsModal(evt) {
    setShowModal(false);
  }

  function filterMembers(evt) {
    if (evt.target.value != "")
      applyFilterToMembers(Members.filter(e => e.value.nameDisplayAs.toLowerCase().includes(evt.target.value.toLowerCase())));
    else
      applyFilterToMembers(Members);
  }

  var getMemberBatch = function (batchNumber) {
    return new Promise(function (resolve, reject) {
      fetch(
        "https://members-api.parliament.uk/api/Members/Search?IsCurrentMember=true&House=1&skip=" +
          batchNumber * 20 +
          "&take=20"
      )
        .then(response => response.json())
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  };

  function getAllMembers() {
    let numMembers = 650;
    let batchSize = 20;
    let numBatches = numMembers / batchSize;
    let currentBatch = 0;
    let allMembers = [];
    let promises = [];
    while (currentBatch <= numBatches) {
      promises.push(getMemberBatch(currentBatch))
      console.log(currentBatch*20);
      currentBatch += 1;
    }
    Promise.all(promises).then(function(values)
    {
      values.forEach(v => {
        allMembers = allMembers.concat(v.items);
      });
      fetchMembers(allMembers);
      applyFilterToMembers(allMembers);
    });
    
  }

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <>
      <h2 className="page-title">Members of Parliament</h2>
      <div className="search-box-container">
        <div className="search-box-background">
          <input onChange={filterMembers} className="search-box" type="text"></input>
        </div>
      </div>
        {FilteredMembers.map((item, id) => {
          return <MemberCard onMemberCardDetailsClick={handleDetailsClick} key={id} listId={id} member={item.value} />;
        })}
      <MemberModal member={SelectedMember} showModal={ShowModal} onDetailsCloseClick={closeDetailsModal} />
    </>
  );
}
