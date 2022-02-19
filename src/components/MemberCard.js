function MemberCard(props) {
  function getColorFromParty(party) {
    switch (party) {
      case "Lab":
        return "#bf616a"
      case "Con":
        return "#5e81ac"
      case "LD":
        return "#d08770"
      case "SNP":
        return "#ebcb8b"
      case "SF":
        return "#a3be8c"
      case "UUP":
        return "#81a1c1"
      default:
      // code block
    }
  }
  function formatMemberName(name)
  {
    if (name.length >= 20) 
      return name.substring(0, 18) + "...";
    
    return name;
  }
  return (
    <div
      className="card"
      style={{ borderLeftColor: getColorFromParty(props.member.latestParty.abbreviation) }}
    >
      <h2>{formatMemberName(props.member.nameDisplayAs)}</h2>
      <div className="card-actions">
        <button
          className="button"
          onClick={props.onMemberCardDetailsClick}
          value={props.listId}
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default MemberCard;
