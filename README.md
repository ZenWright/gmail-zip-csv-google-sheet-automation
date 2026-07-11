# Gmail ZIP CSV Google Sheet Automation

## Overview

Automated reporting pipeline built using Google Apps Script to process operational reports received through Gmail.

The automation extracts ZIP attachments, converts CSV files, applies business cleaning rules, removes duplicates, and updates Google Sheets automatically.

---

## Business Problem

The operations team receives hourly funnel reports through email in ZIP format.

The manual process involved:

- Downloading ZIP attachments
- Extracting CSV files
- Cleaning data manually
- Removing duplicate records
- Updating reporting sheets

This process consumed manual effort and increased the chances of reporting errors.

---

## Solution

Built an automated Gmail-to-Google-Sheets data pipeline using Google Apps Script.

The workflow:

Gmail Email  
↓  
ZIP Attachment  
↓  
CSV Extraction  
↓  
Data Cleaning  
↓  
Duplicate Removal  
↓  
Google Sheet Update

---

## Data Cleaning Rules Implemented

### Duplicate Removal

Removed duplicate records using:

- BuyerID
- ProjectID


### Lead Filtering

Removed records where:

- Type_of_Lead = Online With Pickup Details


### Call Status Filtering

Removed records where:

- Call Disposition Status = DND

---

## Technology Stack

- Google Apps Script
- JavaScript
- Gmail Service
- Google Sheets
- CSV Processing
- Data Automation

---

## Key Features

✅ Automated email attachment processing  
✅ ZIP file extraction  
✅ CSV parsing  
✅ Data validation  
✅ Duplicate removal  
✅ Business rule-based filtering  
✅ Automated Google Sheet refresh  

---

## Business Impact

- Reduced manual reporting effort
- Improved data accuracy
- Standardized reporting workflow
- Enabled faster operational decision-making

---

## Project Structure


---

## Author

**Syed**  
Data Analyst | SQL | Power BI | Google Apps Script | MIS Automation
