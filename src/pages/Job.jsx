import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const money = (n, currency = "USD") =>
  typeof n === "number"
    ? n.toLocaleString("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      })
    : "";

const Job = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async (slug) => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://paycrunch.co/api/v1/jobs/${slug}.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        setJob(await response.json());
      } catch (err) {
        setError(err.message);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData(slug);
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Could not load job: {error}</p>;
  if (!job) return null;

  const { wage, top_end, step_up } = job;
  const currency = wage?.currency;

  return (
    <>
      <h2>{job?.name}</h2>
      <p>{job?.tier_note}</p>

      <section className="dashboard-section">
        <h3>General Information</h3>
        <div className="data-container">
          <table>
            <tbody>
              <tr>
                <th scope="row">Standard Occupational Classification</th>
                <td>{job?.soc}</td>
              </tr>
              <tr>
                <th scope="row">PayCrunch Estimate</th>
                <td>{job?.estimated ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th scope="row">U.S. Bureau of Labor Statistics Title</th>
                <td>{job?.bls_title}</td>
              </tr>
              <tr>
                <th scope="row">Job Zone</th>
                <td>{job?.job_zone}</td>
              </tr>
              <tr>
                <th scope="row">Source</th>
                <td>{job?.source}</td>
              </tr>
              <tr>
                <th scope="row">Release</th>
                <td>{job?.source_release}</td>
              </tr>
              <tr>
                <th scope="row">Last Updated</th>
                <td>{job?.last_updated}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-section">
        <h3>
          Annual Wage{wage?.period ? ` (per ${wage.period})` : ""}
        </h3>
        <div className="data-container">
          <table>
            <tbody>
              <tr>
                <th scope="row">10th Percentile</th>
                <td>{money(wage?.p10, currency)}</td>
              </tr>
              <tr>
                <th scope="row">25th Percentile</th>
                <td>{money(wage?.p25, currency)}</td>
              </tr>
              <tr>
                <th scope="row">Median</th>
                <td>{money(wage?.median, currency)}</td>
              </tr>
              <tr>
                <th scope="row">75th Percentile</th>
                <td>{money(wage?.p75, currency)}</td>
              </tr>
              <tr>
                <th scope="row">90th Percentile</th>
                <td>{money(wage?.p90, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {top_end && (
        <section className="dashboard-section">
          <h3>Top End</h3>
          <div className="data-container">
            <table>
              <tbody>
                <tr>
                  <th scope="row">Amount</th>
                  <td>{money(top_end?.amount, currency)}</td>
                </tr>
                <tr>
                  <th scope="row">{top_end?.scope === "state" ? "State" : "Scope"}</th>
                  <td>{top_end?.state ?? top_end?.scope}</td>
                </tr>
                <tr>
                  <th scope="row">State Median</th>
                  <td>{money(top_end?.state_median, currency)}</td>
                </tr>
                <tr>
                  <th scope="row">State Employment</th>
                  <td>{top_end?.state_employment?.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {top_end?.basis && <p>{top_end.basis}</p>}
        </section>
      )}

      {step_up && (
        <section className="dashboard-section">
          <h3>Step Up: {step_up?.title}</h3>
          <div className="data-container">
            <table>
              <tbody>
                <tr>
                  <th scope="row">SOC</th>
                  <td>{step_up?.soc}</td>
                </tr>
                <tr>
                  <th scope="row">Median</th>
                  <td>{money(step_up?.median, currency)}</td>
                </tr>
                <tr>
                  <th scope="row">Top End</th>
                  <td>{money(step_up?.top_end?.amount, currency)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {step_up?.note && <p>{step_up.note}</p>}
        </section>
      )}

      {Array.isArray(job?.core_tasks) && job.core_tasks.length > 0 && (
        <section className="dashboard-section">
          <h3>Core Tasks</h3>
          <ul>
            {job.core_tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(job?.hot_tech) && job.hot_tech.length > 0 && (
        <section className="dashboard-section">
          <h3>Hot Technologies</h3>
          <ul>
            {job.hot_tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
      )}

      <p>
        {job?.url && (
          <>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              View on PayCrunch
            </a>{" "}
            ·{" "}
          </>
        )}
        <Link to="/">Back to all jobs</Link>
      </p>
      {(job?.attribution || job?.license) && (
        <small>
          {job?.attribution} {job?.license && `License: ${job.license}`}
        </small>
      )}
    </>
  );
};

export default Job;
