import { useState, useEffect } from "react";
import Card from "../components/Card";
import Row from "../components/Row";
import Slider from "../components/Slider";
import SalaryHistogram from "../components/SalaryHistogram";
import StateBarChart from "../components/StateBarChart";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [estimatedFilter, setEstimatedFilter] = useState("all");
  const [salaryRange, setSalaryRange] = useState([0, 500000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStates, setSelectedStates] = useState([]);

  function toggleSelectedState(stateName) {
    setSelectedStates((prev) =>
      prev.includes(stateName)
        ? prev.filter((s) => s !== stateName)
        : [...prev, stateName],
    );
  }

  const stateOptions = [
    ...new Set(jobs.map((job) => job.top_end_state).filter((state) => !!state)),
  ].sort();

  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.trim().toLowerCase();

    const nameMatchesQuery = job.name.toLowerCase().includes(query);

    const stateMatchesQuery = (job.top_end_state ?? "")
      .toLowerCase()
      .includes(query);

    const matchesEstimated =
      estimatedFilter === "all" ||
      job.estimated === (estimatedFilter === "true");

    const matchesSalaryRange =
      job.median >= salaryRange[0] && job.median <= salaryRange[1];

    const matchesSelectedStates =
      selectedStates.length === 0 || selectedStates.includes(job.top_end_state);

    return (
      matchesEstimated &&
      (nameMatchesQuery || stateMatchesQuery) &&
      matchesSalaryRange &&
      matchesSelectedStates
    );
  });

  const minMedianSalary = filteredJobs.length
    ? Math.min(...filteredJobs.map((job) => job.median))
    : 0;

  const maxMedianSalary = filteredJobs.length
    ? Math.max(...filteredJobs.map((job) => job.median))
    : 0;

  const avgMedianSalary = filteredJobs.length
    ? filteredJobs.reduce((sum, job) => sum + job.median, 0) /
      filteredJobs.length
    : 0;

  const estimatedPercent = filteredJobs.length
    ? (filteredJobs.reduce((sum, job) => sum + (job.estimated ? 1 : 0), 0) /
        filteredJobs.length) *
      100
    : 0;

  useEffect(() => {
    async function fetchJobs() {
      const url = "https://paycrunch.co/api/v1/jobs.json";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setJobs(data.jobs);
    }

    fetchJobs();
  }, []);

  return (
    <>
      <section className="dashboard-section">
        <div className="stats-grid">
          <Card title={"Occupations Shown"} value={filteredJobs.length}></Card>
          <Card
            title={"Average Median Salary"}
            value={`${avgMedianSalary.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            })}`}
          ></Card>
          <Card
            title={"Median Salary Range"}
            value={`$${minMedianSalary} - $${maxMedianSalary}`}
          ></Card>
          <Card
            title={"PayCrunch Estimates"}
            value={estimatedPercent.toFixed(2) + " %"}
          ></Card>
        </div>
      </section>

      <div className="filter-container">
        <input
          type="search"
          placeholder="Search occupation or state..."
          aria-label="Search occupation or state"
          onChange={(e) => {
            console.log(e.target.value);
            setSearchQuery(e.target.value);
          }}
        ></input>

        <label htmlFor="estimated">PayCrunch Estimate:</label>
        <select
          id="estimated"
          value={estimatedFilter}
          onChange={(e) => setEstimatedFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="true">Yes (PayCrunch estimate)</option>
          <option value="false">No (BLS data)</option>
        </select>

        <span>Top-Paying State:</span>
        {stateOptions.map((stateName) => (
          <label key={stateName}>
            <input
              type="checkbox"
              checked={selectedStates.includes(stateName)}
              onChange={() => toggleSelectedState(stateName)}
            />
            {stateName}
          </label>
        ))}

        <span>Median Salary:</span>
        <Slider values={salaryRange} setValues={setSalaryRange} />
      </div>

      <section className="dashboard-section">
        <div className="data-container">
          <table>
            <thead>
              <tr>
                <th>Occupation</th>
                <th>PayCrunch Estimate</th>
                <th>Median Salary</th>
                <th>Top-End Salary</th>
                <th>Top-Paying State</th>
                <th>Data Source</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs &&
                filteredJobs.map((job) => {
                  return <Row key={job.slug} job={job} />;
                })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-section">
        <SalaryHistogram jobs={filteredJobs} />
        <StateBarChart jobs={filteredJobs} />
      </section>
    </>
  );
}

export default Home;
