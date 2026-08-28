# Blueprint: UK Retail Sales & Category Performance Analysis

## Why this project exists

This is the most deliberately structured project in my portfolio: rather than a single script or dashboard, it walks through a complete Business Analyst lifecycle on one dataset, from problem definition through to a stakeholder presentation. I built it against publicly available ONS Retail Sales Index data because it is real, freely available, and large enough (109 months) to support genuine trend and seasonality analysis, and I wrapped it in an illustrative mid-size retailer scenario so the recommendations have a concrete decision-maker to be written for, while being explicit throughout that no real client or employer engagement sits behind it.

## The lifecycle, deliverable by deliverable

D1 sets out the problem statement and business case: why a mid-size non-food retailer would care about structural change in retail sales, who the stakeholders are, and what the project is trying to achieve. D2 turns that into a MoSCoW-prioritised requirements document covering functional, non-functional and data requirements, the standard BA translation from problem to scope. D3 maps the current-state decision process (where staffing and category decisions get made without much data input) against a future-state process built around the ONS dashboard, as a pair of swimlane diagrams. D4 is the dashboard itself, built as a standalone React component. D5 takes the patterns the dashboard surfaces and turns them into five prioritised, effort-and-timeline-scored recommendations. D6 compresses all of that into an eleven-slide leadership deck.

## How the dashboard works

`D4_UK_Retail_Dashboard.jsx` is a single self-contained React component (Recharts for charting) built around one array of 109 monthly ONS index values, one row per month with a short key per sub-sector (`ar` for all retail, `f` for food, `nf` for non-food, `tx` for textiles and clothing, `hh` for household goods, `ns` for non-store/online, `on` for other non-food, `ds` for department stores). Everything else in the file is derived from that one array with `useMemo`: a re-indexed series against the January 2019 baseline, a year-on-year percentage change series matched month-to-month against the same month the previous year, and a seasonal comparison that averages each calendar month separately across the pre-pandemic (2017-2019) and post-pandemic (2022-2025) periods so seasonal patterns can be compared before and after the shock rather than blended together. Six view tabs (Sector Trends, Indexed to 2019, Year-on-Year Change, Seasonal Patterns, Non-Store Growth, Sector Comparison) render different charts off the same derived data, and KPI cards at the top recompute live off whichever sector series is toggled on.

## Where the numbers in D5 and the README come from

The headline figures (household goods down 9.7% against the 2019 average, non-store up 18.1%, and so on) are read directly off the indexed series the dashboard computes, using the annual 2019 average as the baseline rather than a single month, specifically to avoid one unusually strong or weak month distorting the comparison. The recommendations in D5 follow directly from those patterns: seasonal staffing alignment follows from the March-peak, January/August-trough pattern the seasonal view surfaces; the department store portfolio review follows from that sub-sector's sustained decline; and the call to re-benchmark household goods against 2019 rather than 2021 follows from 2021 being an artificially inflated, pandemic-distorted baseline that would understate how much the category has actually fallen.

## What's illustrative and what's real

The ONS data, the 109-month coverage, and every index and percentage-change figure calculated from it are real. What is illustrative is the retailer: there is no actual mid-size non-food retailer commissioning this work, so the requirements, process maps and recommendations are written against a realistic but constructed scenario, which the README and D1 both say explicitly. That distinction is the reason this project can show a full BA lifecycle without overstating what it is.

## What I'd add next

A live data refresh script that pulls the latest ONS Retail Sales Index release each month and re-runs the indexing and seasonal calculations automatically, so the dashboard's "data to" date never goes stale, and a short written note in D2 or D3 quantifying the current-state process's actual cost (hours spent, decisions delayed) to make the future-state business case more concrete.
