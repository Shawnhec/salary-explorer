# Web Development Project 5 - *Salary Explorer*

Submitted by: **Shawn**

This web app: **Salary Explorer is a dashboard of U.S. salary data for 1,008 occupations, fetched from the PayCrunch API. It shows summary statistics at a glance and lets you search and filter the list by occupation, top-paying state, data type (BLS figure vs. PayCrunch estimate), and median salary range.**

Time spent: **16** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - **Occupations Shown**: count of occupations matching the current search and filters
    - **Average Median Salary**: mean of the median salaries of the shown occupations
    - **Median Salary Range**: lowest and highest median salary among the shown occupations
    - **PayCrunch Estimates**: percentage of shown occupations whose figures are PayCrunch estimates rather than BLS data
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Summary statistics recalculate live based on the current search and filters
* [x] Search matches either the occupation name or the top-paying state
* [x] Multi-select "Top-Paying State" filter using checkbox chips
* [x] Two-handle slider sets both the lower and upper bound of median salary
* [x] Each row links to the occupation's detail page on PayCrunch
* [x] Scrollable table with a sticky header, plus a responsive layout for mobile
* [x] Deployed to GitHub Pages with GitHub Actions: https://shawnhec.github.io/salary-explorer/

## Video Walkthrough

Here's a walkthrough of implemented user stories:

[![Video Walkthrough](https://i.ytimg.com/vi/cITtOLlCw7M/hqdefault.jpg)](https://youtu.be/cITtOLlCw7M)

Video walkthrough hosted on YouTube: https://youtu.be/cITtOLlCw7M

## Notes

Describe any challenges encountered while building the app.

- About 57 occupations have no top-paying state. At first, those rows were hidden even when no state was selected; I fixed the filter so that selecting no states shows everything.
- The API field names (`estimated`, `top_end`, `top_end_state`) were not self-explanatory, so I read the API's field notes and renamed the columns and filter labels to make them clearer.
- The first GitHub Pages deploy showed a blank page because Vite's `base` was set to my local folder name instead of the repo path. Setting `base: "./"` fixed it.
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
