# Web Development Project 6 - *Salary Explorer*

Submitted by: **Shawn**

This web app: **Salary Explorer is a dashboard of U.S. salary data for 1,008 occupations, fetched from the PayCrunch API. The dashboard shows summary statistics, two charts, and a searchable, filterable list of occupations. Each occupation links to its own detail page with percentile wages, top-end pay, a career step-up, core tasks, and hot technologies.**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset
    - **Median Salary Distribution**: a histogram showing how many occupations fall in each $25k median-salary range
    - **Top-Paying States**: a bar chart of the 10 states that are the top-paying state for the most occupations


The following **optional** features are implemented:

- [ ] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [ ] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [x] Both charts update live based on the current search and filters
* [x] Summary statistics recalculate live based on the current search and filters
* [x] Search matches either the occupation name or the top-paying state
* [x] Multiple filters at once: PayCrunch estimate dropdown, multi-select top-paying state checkboxes, and a two-handle median salary slider
* [x] Detail page shows the full wage percentiles (10th to 90th), top-end details, the career step-up occupation, core tasks, and hot technologies
* [x] Detail page handles loading, request errors, and missing fields without crashing
* [x] Deployed to GitHub Pages with GitHub Actions: https://shawnhec.github.io/salary-explorer/

## Video Walkthrough

Here's a walkthrough of implemented user stories:

[![Video Walkthrough](https://i.ytimg.com/vi/Q7FiTJ1xBy0/hqdefault.jpg)](https://youtu.be/Q7FiTJ1xBy0)

Video walkthrough hosted on YouTube: https://youtu.be/Q7FiTJ1xBy0

## Notes

Describe any challenges encountered while building the app.

- The detail page was blank on GitHub Pages at first. The app is served from `/salary-explorer/`, but `BrowserRouter` treated that whole path as the route, so nothing matched and the Not Found page showed. GitHub Pages also has no fallback for deep links, so opening a detail URL directly returns a 404. Switching to `HashRouter` fixed both, since the route is read from the part of the URL after `#`. Detail pages are reachable at `https://shawnhec.github.io/salary-explorer/#/jobs/pilot-salary`.
- Not every occupation has every field (for example, `top_end.state` can be `null`), so the detail page uses optional chaining and checks before rendering optional sections.
- The API only gives a top-paying state per occupation, not a median salary for each state, so a state-by-state salary map was not possible with this data.
- Data source: [PayCrunch API](https://paycrunch.co) (CC BY 4.0). Figures come from the U.S. Bureau of Labor Statistics OEWS May 2025 release unless marked as a PayCrunch estimate.

## License

    Copyright 2026 Shawn

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
