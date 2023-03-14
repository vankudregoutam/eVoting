import React from 'react'

const View = ({ candidates }) => {
  return (
    <>
      { candidates.map(candidate => (
        <tr key={candidate.Name} PartyName={candidate.PartyName}>
          <td>{candidate.Name}</td>
          <td>{candidate.PartyName}</td>
          {/* <td></td> */}
        </tr>
        ))
      }
    </>
  )
}

export default View;
