
export const investigator_schema = [
  { label: "Investigator", type: "label" },
  { id: "fname", label: "Name" },
  { id: "experience", label: "Experience" },
  // { id: "case_load", label: "Case Load" },
  // { id: "money", label: "Cost" },
//  { id: "hours", label: "Hours" },
];

export const claimant_schema = [
  { label: "Claimant", type: "label" },
  { id: "name", label: "Name" },
  { id: "age", label: "Age" },
  // { id: "ss", label: "SS#", type: "password" },
  { id: "job_title", label: "Job Title", type: "text" },
];

export const claimant = [
  {
    id: 1,
    name: "Jon Lewin",
    age: 34,
    ss: "123-456-7890",
    job_title: "Truck Driver",
  },
];

export const insured_schema = [
  { label: "Insured", type: "label" },
  { id: "insured", label: "Insured" },
  { id: "employees", label: "Employeees" },
  { id: "policy_age", label: "Policy Age (months)" },
];

export const insured = [
  {
    insured: "USA Trucks",
    employees: 14,
    policy_age: 5,
  }
];

export const claim_schema = [
  { label: "Claim", type: "label" },
  { id: "date_of_loss", label: "Date of Loss", type: "date" },
  { id: "claim_age", label: "Claim Age" },
  { id: "location_loss", label: "Location Loss", type: "text" },
  { id: "loss", label: "Loss" },
  { id: "status", label: "Claim Status", options: ["Active", "Closed", "New"], type: "select" },
];

export const claim = [{
  date_of_loss: "2018-12-22",
  claim_age: "2 months",
  location_loss: "Seattle, WA",
  status: "Active",
  loss: "Injury, lower back pain",
}];

export const loss_schema = [
  { label: "Claim and Loss Estimate", type: "label" },
  { id: "settlement", label: "Est. Settlement" },
  { id: "paid", label: "Paid To Date" },
  { id: "siu_cost", label: "SIU cost to date" },
  { id: "reserves", label: "Reserves" },
  { id: "est_cost", label: "Est. Cost" },
];

export const loss = [
  {
    settlement: "$14,500",
    paid: "$5,500",
    siu_cost: "$4,000",
    reserves: "$10,000",
    est_cost: "34,000",
  }
];

export const demographics = [
  { title: "Santa Clarita", value: 290 },
  { title: "County Average", value: 140 },
  { title: "Glendale", value: 190 },
  { title: "Lancaster", value: 120 },
  { title: "National Average", value: 98 },
  { title: "State Average", value: 100 },
];

export const demographic_loss = [
  { title: "Location of loss", value: "Santa Clarita" },
  { title: "Location fraud history", value: "High" },
];


export const fraud = [
  { title: "Claim Fraud", year: "Extreme", value: [9.8], history: [0, 80, 15, 50, 210, 250] },
  { title: "Provider Fraud", year: "High", value: [8.7], history: [250, 240, 300, 230, 270, 280] },
  { title: "Collusion Fraud", year: "Detected", value: 5.0, history: [250, 240, 300, 230, 270, 280] },
  { title: "Related Claims", year: "37", value: 2.0, history: [150, 200, 170, 210, 250, 190] },
  { title: "Suspicious Graph", year: "Flagged", value: 9.0, history: [280, 230, 280, 290, 260, 210] },
];

export const fraud_settle = [
  { title: "Attorney Involvement", year: "Low", value: [1.2], history: [0, 80, 15, 50, 210, 250] },
  { title: "Early Settlement", year: "High", value: [6.2], history: [0, 80, 15, 50, 210, 250] },
  { title: "Adjucation  Success", year: "High", value: [3.2], history: [0, 80, 15, 50, 210, 250] },
];

export const explanations = [
  { title: "1550% above norm RX costs", year: "" },
  { title: "Impossible commute distance ", year: "" },
  { title: "87% similar to 7 fraud cases", year: "" },
  { title: "Too many claims by employer", year: "" },
  { title: "Doctor found in fraud network", year: "" },
];

export const estimates = [
  { title: "Investigation Cost", year: "$11,500" },
  { title: "Investigation Length", year: "2 months" },
  { title: "Restitution Likelihood", year: "100%" },
  { title: "Restitution Amount", year: "$31,000" },
  { title: "", year: "" },
];
