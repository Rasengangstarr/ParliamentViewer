import React, { useState, useEffect } from "react";
import MemberCard from "./MemberCard";

export default function MemberList() {
  const [Members, fetchMembers] = useState([]);

  var getMemberBatch = function (batchNumber) {
    return new Promise(function (resolve, reject) {
      fetch(
        "https://members-api.parliament.uk/api/Members/Search?skip" +
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
    while (currentBatch < numBatches) {
      promises.push(getMemberBatch(currentBatch))
      currentBatch += 1;
    }
    Promise.all(promises).then(function(values)
    {
      values.forEach(v => {
        allMembers = allMembers.concat(v.items);
        console.log(allMembers);
        console.log(v.items);
      });
      fetchMembers(allMembers);
    });
    
  }

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <>
      <h2>Members of Parliament</h2>
        {Members.map((item, id) => {
          return <MemberCard name={item.value.nameDisplayAs} />;
        })}
    </>
  );
}
