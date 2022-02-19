function MemberCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <div className="card-actions">
        <button className="button">Details</button>
      </div>
    </div>
  );
}

export default MemberCard;
