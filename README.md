# Automated Email AI Responder

This Google Apps Script automatically searches your Gmail inbox for unread messages, drafts context-aware replies using the Gemini API, sends the replies, and marks the processed threads as read.

## Prerequisites

To use this script, you will need:
* A Google Account (Gmail/Google Workspace).
* A Gemini API key. You can obtain one from the Google AI Studio.

## Setup Instructions

### 1. Create the Script
1. Go to [Google Apps Script](https://script.google.com/).
2. Click **New Project**.
3. Delete any default code and paste the script code into the editor.
4. Save the project (e.g., name it `Email AI Responder`).

### 2. Configure Script Properties
The script retrieves the API key securely from your project's properties.
1. Click the gear icon (**Project Settings**) in the left sidebar.
2. Scroll down to **Script Properties** and click **Add script property**.
3. Set the **Property** name to `GEMINI_API_KEY`.
4. Set the **Value** to your Gemini API key.
5. Click **Save script properties**.

### 3. Customize the System Prompt (Optional)
Inside the script, you can modify the `systemPrompt` constant to change how the AI behaves:
```javascript
const systemPrompt = "You are a helpful assistant. Keep your response brief and polite.";
```

### 4. Authorize and Run
1. Select the `autoReplyWithAI` function from the dropdown in the toolbar.
2. Click **Run**.
3. You will be prompted to grant permissions for the script to access your Gmail account and connect to external services. Review and accept the permissions.

### 5. Automate with Triggers
To have this script run automatically in the background:
1. Click the clock icon (**Triggers**) in the left sidebar.
2. Click **Add Trigger** (bottom right).
3. Set the following options:
   * **Choose which function to run**: `autoReplyWithAI`
   * **Select event source**: `Time-driven`
   * **Select type of time based trigger**: Choose your preferred interval (e.g., `Minutes timer` -> `Every 10 minutes`).
4. Click **Save**.

## Code Overview

* **`GmailApp.search('is:unread')`**: Finds unread threads in your inbox.
* **`UrlFetchApp.fetch`**: Sends the text content of the latest message to the Gemini API (`gemini-3.5-flash` model).
* **`thread.reply` & `thread.markRead`**: Replies to the sender and marks the email as read so it is not processed again on the next run.
