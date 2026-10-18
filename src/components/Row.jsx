import React from "react";

const Row = ({ job }) => {
  return (
    <tr>
      <td>{job.name}</td>
      <td>{job.estimated ? "Yes" : "No"}</td>
      <td>{job.median.toLocaleString()}</td>
      <td>{job.top_end.toLocaleString()}</td>
      <td>{job.top_end_state}</td>
      <td>{job.source}</td>
      <td>
        <a href={job.url} target="_blank" rel="noopener noreferrer">
          View on PayCrunch
        </a>
      </td>
    </tr>
  );
};

export default Row;
