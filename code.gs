function autoReplyWithAI() {
  const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  const systemPrompt = "You are a helpful assistant. Keep your response brief and polite.";
  
  // Gets unread threads from the inbox
  const threads = GmailApp.search('is:unread');

  threads.forEach(thread => {
    const lastMessage = thread.getMessages().pop();
    const cleanText = lastMessage.getPlainBody().trim();

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    const payload = { 
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: cleanText }] }] 
    };

    try {
      const response = UrlFetchApp.fetch(url, {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload)
      });
      
      const json = JSON.parse(response.getContentText());
      const replyText = json.candidates[0].content.parts[0].text.trim();

      thread.reply(replyText);
      thread.markRead();
    } catch (e) {
      Logger.log("Failed to process thread: " + e.message);
    }
  });
}
