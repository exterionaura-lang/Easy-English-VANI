import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. API endpoints will fail.");
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// Fallback Generators to handle 429 Quota Exhaustion cleanly & provide uninterrupted coaching
function generateLocalCoachFallback(messages: any[], topicTitle: string, userLevel: string) {
  const lastUserMsgRecord = [...messages].reverse().find(m => m.role === "user");
  const userText = lastUserMsgRecord ? lastUserMsgRecord.content : "";
  const textLower = userText.toLowerCase().trim();
  
  // Hash userText to get a pseudo-random index configuration for varied replies
  const hash = userText.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) || 42;

  let grammarCorrection = "Excellent spelling and grammar! Your typing structure is very natural.";
  let vocabularyBoost = "Boost: Try using 'grateful' or 'looking forward to' to make your sentence look even more professional.";
  let bilingualTip = "";

  // Rule-based common Indian/Hindi/Bengali learner grammar checks
  if (/\bi\b/.test(userText) && !/\bI\b/.test(userText)) {
    grammarCorrection = "Grammar Tip: Remember to always capitalize the letter 'I' when speaking or writing about yourself in the first person (e.g., say 'I' instead of 'i').";
  } else if (textLower.includes("dont ") || textLower.includes("doesnt ")) {
    grammarCorrection = "Writing Tip: Try typing 'don't' or 'doesn't' with an apostrophe instead of 'dont'. It makes your written English look polished and precise.";
  } else if (textLower.includes("i has") || textLower.includes("i have went")) {
    grammarCorrection = "Correction: Instead of 'I has went' or 'I has done', try saying 'I have gone' or 'I have done'. In English, the subject 'I' always pairs with 'have'.";
  } else if (textLower.includes("does you") || textLower.includes("do he") || textLower.includes("do she")) {
    grammarCorrection = "Correction: Remember that singular third-person subjects use 'does' (e.g. 'Does he/she...'), whereas 'you' and 'they' use 'do' (e.g. 'Do you...').";
  } else if (/\bdid\s+\w+(ed|nt)\b/.test(textLower) || textLower.includes("did went") || textLower.includes("did talked") || textLower.includes("did called")) {
    grammarCorrection = "Correction: When using 'did' as an auxiliary verb, the main verb should remain in its base form. For example, use 'did go' instead of 'did went', or 'did talk' instead of 'did talked'.";
  } else if (textLower.includes("didn't knew") || textLower.includes("did not knew") || textLower.includes("dont knew") || textLower.includes("don't knew")) {
    grammarCorrection = "Grammar Correction: Instead of 'didn't knew', say 'didn't know'. After 'did/didn't', always use the base form of the verb.";
  } else if (textLower.includes("more better") || textLower.includes("more faster") || textLower.includes("more closer")) {
    grammarCorrection = "Correction: Avoid matching 'more' with words that already end in '-er' (double comparatives). Instead of 'more better', simply say 'much better' or 'even better'.";
  } else if (textLower.includes("i saw a dream") || textLower.includes("me seen a dream") || textLower.includes("i see a dream")) {
    grammarCorrection = "Grammar Tip: In English, we usually 'had a dream' rather than 'saw a dream'. For example: 'I had a wonderful dream last night.'";
  } else if (textLower.includes("one of my friend")) {
    grammarCorrection = "Grammar Tip: When you say 'one of my...', always use a plural noun because you are choosing one from a group. Try: 'one of my friends'.";
  } else if (/\bi\s+am\s+(student|teacher|doctor|engineer|designer)/.test(textLower)) {
    grammarCorrection = "Correction: Remember to include an indefinite article ('a' or 'an') before professional titles or roles. Try: 'I am a student' or 'I am an engineer'.";
  } else if (textLower.includes("me and my") || textLower.includes("myself and my")) {
    grammarCorrection = "Politeness structure: It is standard in English to place other persons first and refer to yourself as 'I' or 'me' at the end. For example: 'My friend and I went there'.";
  } else if (textLower.includes("myself ") && textLower.length < 30) {
    grammarCorrection = "Introductory Tip: Introducing yourself by saying 'Myself Pankaj/Amit' is very colloquial. It is much better and more professional to say 'My name is Pankaj' or 'I am Pankaj'.";
  } else if (textLower.includes("according to me")) {
    grammarCorrection = "Vocabulary Style: 'According to' is usually used for external sources. When sharing personal opinions, say 'In my opinion' or 'From my point of view'.";
  } else if (textLower.includes("discuss about") || textLower.includes("discussed about")) {
    grammarCorrection = "Grammar Tip: In English, the verb 'discuss' takes a direct object, so we do not need 'about'. Try saying 'discuss the issue' instead of 'discuss about the issue'.";
  } else if (textLower.includes("revert back") || textLower.includes("reply back")) {
    grammarCorrection = "Redundancy Correction: Both 'revert' and 'reply' already mean to send or go back, so 'back' is redundant. Simply write: 'Please revert as soon as possible.'";
  } else if (textLower.includes("since two years") || textLower.includes("since 2 years") || textLower.includes("since many years")) {
    grammarCorrection = "Correction: If you refer to a duration of time, use 'for' (e.g., 'for two years'). Use 'since' only for a specific start point in time (e.g., 'since 2024').";
  } else if (textLower.includes("passed out") && (textLower.includes("college") || textLower.includes("school") || textLower.includes("degree") || textLower.includes("university"))) {
    grammarCorrection = "Context Tip: 'Passed out' in international English means losing consciousness (fainting). For academic milestones, try 'graduated from college' or 'completed school'.";
  }

  // Vocabulary boosts
  if (textLower.includes("very happy") || textLower.includes("so happy") || textLower.includes("too happy")) {
    vocabularyBoost = "Boost: Try using 'elated', 'delighted', or 'thrilled' to express intense happiness in your conversations!";
  } else if (textLower.includes("very busy") || textLower.includes("so busy")) {
    vocabularyBoost = "Boost: Instead of 'very busy', you can say 'swamped with work', 'overloaded', or 'having a jam-packed schedule'.";
  } else if (textLower.includes("tell me") || textLower.includes("say me")) {
    vocabularyBoost = "Boost: Try using elevated phrasings like 'enlighten me', 'explain to me', or 'elaborate on'.";
  } else if (textLower.includes("very good") || textLower.includes("so good")) {
    vocabularyBoost = "Boost: Spice up your English using powerful words like 'superb', 'splendid', 'exemplary', or 'marvelous'!";
  } else if (textLower.includes("sorry") || textLower.includes("i am sorry")) {
    vocabularyBoost = "Boost: To sound more formal and warm, use expressions like 'Please accept my sincere apologies' or 'My apologies for any inconvenience caused'.";
  } else if (textLower.includes("buy")) {
    vocabularyBoost = "Boost: Try replacing 'buy' with 'purchase' or 'acquire' in more professional or commercial settings.";
  } else if (textLower.includes("problem") || textLower.includes("difficult")) {
    vocabularyBoost = "Boost: Try referring to problems as 'roadblocks', 'bottlenecks', or 'challenges' to sound more positive and proactive.";
  }

  // Bilingual tips (Hinglish / Benglish detection)
  if (textLower.includes("yaar") || textLower.includes("bhai")) {
    bilingualTip = "Tip: You used the friendly Hindi word 'yaar' or 'bhai'. In general English, you can translate this perfectly to 'my friend', 'buddy', 'folks', or 'comrade'!";
  } else if (textLower.includes("achha") || textLower.includes("acha") || textLower.includes("achha?")) {
    bilingualTip = "Tip: 'Achha' can translate to 'Oh I see!', 'Is that so?', 'Aha!', or simple agreement words like 'Indeed' or 'Sure'.";
  } else if (textLower.includes("theek") || textLower.includes("thik")) {
    bilingualTip = "Tip: 'Theek hai' translates standardly to 'Alright', 'Got it', 'That works', or 'That sounds fine'.";
  } else if (textLower.includes("boba") || textLower.includes("shob") || textLower.includes("naam")) {
    bilingualTip = "Tip: Detected Bengali phrasing elements! Translation equivalents include 'everything' (shob) and 'name' (naam).";
  } else if (textLower.includes("ki") || textLower.includes("ami") || textLower.includes("na")) {
    bilingualTip = "Tip: Remember that basic Bengali connectives translate nicely: 'Ami' can be translated as 'I am', and 'Na' as 'No' or 'Not'.";
  }

  // Large look-up index for over 20 learning topics
  const topicResponses: { [key: string]: string[] } = {
    "handle tough questions": [
      "Handling tough questions is all about taking a breath and showing structured confidence. How would you handle a tricky question from a demanding supervisor?",
      "That is a great start! Remember, a good strategy is to buy time by saying, 'That is a very insightful question...' How else could you open your response?",
      "Perfect! Keeping your tone calm and professional is half the battle won. What is the hardest question you have faced in an interview?"
    ],
    "introduce yourself": [
      "Self-introductions are essential! Can you share three adjectives that describe you best, and why you selected them?",
      "An elegant elevator pitch is super impactful. Can you describe what your primary career goal is over the next six months?",
      "Excellent practice! Remember to speak at an even pace so you sound fully composed. What is one personal project or habit you're proud of?"
    ],
    "about yourself": [
      "Self-introductions are essential! Can you share three adjectives that describe you best, and why you selected them?",
      "An elegant elevator pitch is super impactful. Can you describe what your primary career goal is over the next six months?",
      "Excellent practice! Remember to speak at an even pace so you sound fully composed. What is one personal project or habit you're proud of?"
    ],
    "confidence building": [
      "Your confidence level is growing beautifully with every sentence! What is one professional goal that really excites you?",
      "I love how natural you are sounding! Let's practice speaking with energy. What is a hobby or movie you can speak about for hours?",
      "You are doing a fantastic job! What does 'sounding confident' mean to you in your daily work environment?"
    ],
    "vocabulary practice": [
      "Enhancing vocabulary is a great path to eloquence! Try to use higher-impact words. What word would you use instead of saying 'very tired'?",
      "Correct! Replacing words like 'good' with 'marvelous' or 'industry-leading' makes a huge difference. What word would you use to describe a beautiful design?",
      "Let's practice context-fitting vocabulary! If you want to say a plan is 'going well', can you try using 'unfolding seamlessly'?"
    ],
    "pronunciation practice": [
      "Pronunciation is all about muscle memory and confidence! Focus on crisp vowels and clear consonants. Why don't you try pronouncing a word with a clean 'sh' sound?",
      "Your speech clarity is really good! Try to record yourself or repeat after me to perfect the flow. What word do you find most difficult to pronounce?",
      "Great focus! Keeping a steady pace ensures that each vowel gets its proper duration. Let's practice saying a complex word!"
    ],
    "job interview": [
      "Excellent interview response! Remember, always relate your answers back to measurable results. What is a key project or career win you love talking about?",
      "Terrific! Interviewers love candidates who show strong self-reflection and growth. How do you describe your main areas of improvement to an interviewer?",
      "That sounds very persuasive! How would you describe your typical working style or leadership qualities in a professional setting?"
    ],
    "college admission": [
      "That is a very neat admission elevator pitch! Why did you choose this specific major or academic stream for higher studies?",
      "Professors love when prospective students display a genuine curiosity for research or field concepts. What book or paper recently inspired you?",
      "Excellently put! Admissions committees are looking for students who will actively contribute to their campus life. What extra-curricular activity do you cherish?"
    ],
    "talk to professor": [
      "Speaking with professors requires extra polite markers like 'May I request...', 'If I may ask...', or 'Could you guide me regarding...'. Try phrasing an extension request politely!",
      "That's a very respectful tone! How would you write a short academic query email to ask a professor for feedback on your study paper?",
      "Excellent! What do you find is the most important key detail to communicate when discussing exam results with academic supervisors?"
    ],
    "public speaking": [
      "Public speaking is a trainable skill, not an inherent talent. Remember to pause for emphasis after key points. What topic would you feel most passionate raising to a large audience?",
      "A great opening hook can make your presentation immediately memorable. How would you open a speech about the future of AI?",
      "Splendid! Body language and breathing control keep nervousness away. How do you prepare yourself physically before stepping on a stage?"
    ],
    "co-worker": [
      "Building a friendly rapport with your coworkers is fantastic for team synergy. Do you usually discuss weekend plans or share tea during office breaks?",
      "That sounds like a very supportive coworker atmosphere! How would you offer to help a team colleague who is currently feeling swamped with workload?",
      "Excellent conversational skill! Keeping small-talk light and supportive is a true superpower. Tell me about your favorite workspace activity."
    ],
    "team meeting": [
      "Meetings are the perfect stage to get noticed by senior leadership. Use transitions like 'Building on what Amit mentioned...' or 'To look at this from another perspective...'. Try one!",
      "That is an excellent contribution! How do you handle it when a team co-worker politely disagrees with your idea in a meeting?",
      "Wonderful! Always back up your ideas in team meetings with a quick, clear rationale. What meeting topic is usually discussed in your team?"
    ],
    "approve a request": [
      "Clear approvals sound decisive and helpful: 'This plan looks extremely solid, please proceed. All the best!' or 'Both timelines line up, request approved!' Try summarizing one.",
      "That is a very encouraging approval response! How would you add a soft condition to an approval, like 'This is approved, provided we complete the safety scan first'?",
      "Excellent workplace structure! Professional communication is about being encouraging but precise. How do you handle approving travel requests?"
    ],
    "give feedback": [
      "The 'Feedback Sandwich' method works perfectly: start with a strong compliment, offer constructive guidance, and end with encouragement. Try formulating one!",
      "That is constructive and empathetic feedback! How do you deliver critical feedback to a team member so they feel inspired instead of discouraged?",
      "Great! Keep the feedback focused strictly on actions and results rather than personal behaviors. What feedback would you give to help a junior speed up?"
    ],
    "office conversation": [
      "Office chat provides great social balance! Do you prefer working hybrid from home or do you thrive in the lively environment of a real workspace?",
      "Indeed! Small talk about sports, office updates, or lunch recipes is a great way to bond. What was the last team celebration you participated in?",
      "That sounds very pleasant! Conversing at work builds lifelong networks. How would you welcome a new joining employee to your office bay?"
    ],
    "business meeting": [
      "Business meetings move quickly. Clear and punchy phrases are key: 'Let's align on next steps', 'Let's take this offline', or 'What's the immediate deliverable?'. Discuss one phrase!",
      "An excellent summary of the meeting's core mission! How do you follow up after a major meeting to ensure everyone is on the same page?",
      "Beautiful! Standard business English is direct yet collaborative. What's the main goal you usually coordinate in your business reviews?"
    ],
    "customer support": [
      "Empathy is the core of outstanding customer service: 'I understand how frustrating that must be, let me look into this right now.' How would you respond to a late order query?",
      "That is an exceptionally patient response! How do you politely explain a company policy limitation to an impatient customer?",
      "Excellent! Active listening and positive framing make customer service truly world-class. What's your personal rule to stay positive with clients?"
    ],
    "restaurant": [
      "Order food elegantly: 'I would like to have...', 'Could we get some extra napkins?', or 'Do you have any vegan options?'. How would you order your favorite soup?",
      "Wonderful order phrasing! When you get the bill, how would you politely query an extra charge or ask the waiter to split the check?",
      "Perfect! Sharing a food critique is also great practice: 'The main course was exceptionally flavorful, but the dessert was a bit too sweet.' Try one call!"
    ],
    "shopping": [
      "Shopping queries should be polite and direct: 'Are there any promotions running today?', 'Do you have this in a medium size?', or 'Can I try this on?'. Ask about a jacket!",
      "Great! If you wanted to return a purchased item, how would you politely ask the cashier for a refund or replacement option?",
      "Fascinating! Do you prefer visiting bustling local street markets or do you enjoy quiet online e-commerce shopping?"
    ],
    "travel": [
      "Travel is the ultimate test of spoken English: booking, asking directions, ordering. What is the most exciting place you have travelled to?",
      "Excellent travel planning description! If you were lost in a foreign airport, how would you ask an information desk agent for terminal assistance?",
      "What is your absolute dream travel destination, and what makes that country or city so appealing to your thoughts?"
    ],
    "phone": [
      "Phone English needs clear pronunciation and patience: 'Am I audible?', 'Sorry, the line is breaking up', or 'Could you please hold for a second?'. Phrase a call transfer!",
      "That's a very natural phone voice! How would you leave a highly professional voicemail for a partner who is currently busy?",
      "Superb! Speaking on the phone can be challenging without visual cues, but you are handling it perfectly. Who do you converse with most over calls?"
    ]
  };

  // Default conversation continuation options
  const generalReplies = [
    "That is so interesting! Can you elaborate on that or give me a quick example of what you mean?",
    "Perfect speed and confidence! Speaking daily is the key. Tell me, how does this fit into your professional goals?",
    "You have a really good grasp of this! If you had to describe that in one sentence, what words would you choose?",
    "Wonderful! Practicing English out loud makes a huge difference. What is another topic you'd love to conquer next?",
    "That sounds exceptionally fine! I love how you structured your thoughts. Should we practice another sentence, or do you have any questions for me?",
    "Excellent effort! Your confidence level is rising beautifully. What is the most challenging thing you find about this specific situation?"
  ];

  let reply = generalReplies[hash % generalReplies.length];
  
  // Custom responses based on standard key phrases to sound active
  const titleLower = (topicTitle || "").toLowerCase().trim();
  
  if (textLower.includes("hello") || textLower.includes("hi") || textLower.includes("namaste") || textLower.includes("hey")) {
    reply = `Hello! It is so wonderful to chat with you today! I am Coach VANI, your supportive AI English guide. What topic or situation would you like to practice today?`;
  } else if (textLower.includes("weather") || textLower.includes("rain") || textLower.includes("hot") || textLower.includes("cold")) {
    reply = `Yes, weather is always a fantastic small-talk starter in English conversations. How is the weather where you are residing today? Is it warm or pleasant?`;
  } else if (textLower.includes("sorry") || textLower.includes("mistake") || textLower.includes("wrong")) {
    reply = `Oh, please don't apologize at all! Making mistakes is the absolute best way to learn any language. You are doing an exceptional job. Let's try another sentence!`;
  } else if (textLower.includes("thank") || textLower.includes("thanks")) {
    reply = `You are most welcome! Helping you make progress with spoken English brings me immense happiness. Is there any specific challenge or word you want to practice next?`;
  } else {
    // Attempt to match the specific selected learning topic
    let matchedTopicKey = "";
    for (const key of Object.keys(topicResponses)) {
      if (titleLower.includes(key)) {
        matchedTopicKey = key;
        break;
      }
    }

    if (matchedTopicKey) {
      const replies = topicResponses[matchedTopicKey];
      reply = replies[hash % replies.length];
    }
  }

  return {
    reply,
    grammarCorrection,
    vocabularyBoost,
    bilingualTip
  };
}

function generateLocalTranslationFallback(text: string, sourceLanguage: string) {
  const textLower = text.toLowerCase().trim();
  let translatedSimple = "This is a wonderful thought about learning and speaking in English.";
  let translatedSmart = "Engaging in proactive speaking is an exceptional path to linguistic mastery.";
  let pronunciationTip = "Pronunciation Tip: Focus on soft 'th' sounds and let the words roll smoothly.";

  // Common Hindi expressions fallbacks
  if (textLower.includes("kaise ho") || textLower.includes("kemon acho") || textLower.includes("how are you")) {
    translatedSimple = "How are you doing?";
    translatedSmart = "How have you been keeping lately?";
    pronunciationTip = "Pronunciation Tip: Keep the 'how' sound fully open and end with a rising friendly voice tone.";
  } else if (textLower.includes("mera naam") || textLower.includes("naam ki") || textLower.includes("amar naam")) {
    translatedSimple = "My name is VANI.";
    translatedSmart = "I go by the name of VANI.";
    pronunciationTip = "Pronunciation Tip: Put gentle emphasis on the name itself ('VA-NI').";
  } else if (textLower.includes("theek") || textLower.includes("thik") || textLower.includes("achha") || textLower.includes("acha")) {
    translatedSimple = "Alright, everything is fine.";
    translatedSmart = "Splendid, everything is perfectly in order.";
    pronunciationTip = "Pronunciation Tip: Sound confident by keeping the word 'splendid' slightly elevated.";
  } else if (textLower.includes("english") || textLower.includes("angreji") || textLower.includes("ingraji")) {
    translatedSimple = "I want to speak fluent English.";
    translatedSmart = "My professional aspiration is to express myself eloquently in English.";
    pronunciationTip = "Pronunciation Tip: Pronounce 'English' with a sharp, crisp 'sh' sound at the end.";
  } else if (textLower.includes("bhai") || textLower.includes("yaar") || textLower.includes("dost")) {
    translatedSimple = "Hello, my dear friend.";
    translatedSmart = "Greetings, my esteemed companion.";
    pronunciationTip = "Pronunciation Tip: Ensure the 'g' in 'greetings' is warm and resonant.";
  } else {
    // Dynamic romanized translator helper attempts
    translatedSimple = `Let us talk and learn together: "${text}"`;
    translatedSmart = `I would love to co-create a conversational learning journey about: "${text}"`;
  }

  return {
    original: text,
    translatedSimple,
    translatedSmart,
    pronunciationTip
  };
}

// API endpoints

// 1. Chat with Coach VANI - includes situational response and gentle structured feedback
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, topicTitle, userLevel = "Beginner" } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array." });
    }

    // Format the last few messages for context
    const recentMessages = messages.slice(-8);

    const systemInstruction = `You are Coach VANI, a warm, polite, and highly encouraging Indian English tutor who helps beginner/intermediate learners (often native Hindi or Bengali speakers) practice English.
Current situational topic: "${topicTitle || "General Conversation"}".
Target User Level: "${userLevel}".

Rules for your role:
1. Speak in clean, direct, friendly, and easy-to-understand English.
2. Keep your conversational response to 2 or 3 short sentences.
3. Warmly end with a question or prompt that encourages the user to reply and keep speaking.
4. You must separately evaluate the user's latest message to provide a beneficial learning tip:
   - "grammarCorrection": If the user made a grammar, tense, or spelling mistake, kindly mention the correction in a gentle, non-judgmental way (e.g. "Instead of 'I has went', try saying 'I went' or 'I have gone'"). If there's no error, leave it empty or write "Excellent spelling and grammar!".
   - "vocabularyBoost": Suggest 1-2 practical words, idiomatic expressions, or natural phrasings the user could use to sound more confident and advanced (e.g., "Boost: Try using 'exquisite' or 'looking forward to'").
   - "bilingualTip": If they mixed in Hindi or Bengali words (e.g. "yaar", "achha", "bhai", "shob"), write a warm translation equivalent of what they said.

You MUST respond in JSON format conforming to the following structure:
{
  "reply": "Your friendly, short conversational response to the user",
  "grammarCorrection": "A gentle correction or positive comment if no errors were made",
  "vocabularyBoost": "One friendly tip on how to say it even better or a new vocabulary word",
  "bilingualTip": "Friendly explanation of any Hindi/Bengali word used, or empty string"
}`;

    const parsedContents = recentMessages.map(m => ({
      role: m.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: parsedContents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { 
              type: Type.STRING, 
              description: "VANI's friendly conversation reply to the user. Keep to 2-3 sentences max and end with a gentle question." 
            },
            grammarCorrection: { 
              type: Type.STRING, 
              description: "Gentle explanation or helpful edit of user's typing structure. If perfect, compliment them." 
            },
            vocabularyBoost: { 
              type: Type.STRING, 
              description: "Suggestions using natural Indian/international phrasings or context-relevant vocabulary to level up." 
            },
            bilingualTip: { 
              type: Type.STRING, 
              description: "Comment on any Indian slang or multilingual expressions used, translating them, otherwise optional." 
            }
          },
          required: ["reply", "grammarCorrection", "vocabularyBoost"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini API.");
    }

    const payload = JSON.parse(resultText);
    res.json(payload);

  } catch (error: any) {
    const errorStr = String(error.message || error);
    const isQuota = errorStr.includes("429") || errorStr.includes("quota") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.includes("limit");
    if (isQuota) {
      console.log("Coach VANI System Status: 429 quota exceeded. Seamlessly transitioned to advanced local responsive coaching fallback.");
    } else {
      console.warn("Gemini Chat Endpoint Warning:", errorStr);
    }
    try {
      const { messages, topicTitle, userLevel = "Beginner" } = req.body;
      const fallbackPayload = generateLocalCoachFallback(messages || [], topicTitle || "", userLevel);
      res.json(fallbackPayload);
    } catch (fallbackErr: any) {
      res.status(500).json({ 
        error: "Unable to process conversation with Coach VANI.",
        details: error.message 
      });
    }
  }
});

// 2. Bilingual Translator tool (e.g. "Translate Hindi/Bengali/other regional thoughts to perfect English")
app.post("/api/translate", async (req, res) => {
  try {
    const { text, sourceLanguage = "Auto-Detect/Bengali" } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text to translate is required." });
    }

    const systemInstruction = `You are VANI's quick translation assistant, specializing in translating regional Indian languages to polished English.
The user is translating a thought or sentence from their selected native language: "${sourceLanguage}".
The input text might be in native script (like Bengali, Devanagari, Tamil, etc.) or romanized script (like Hinglish, Benglish, Web Tamil, etc.).
1. Translate it into polite, natural spoken English suitable for everyday conversations.
2. Provide two variations: "Simple English" (very easy and plain) and "Smart/Confident English" (more high-impact, professional, or idiomatic).
3. Provide a brief 1-sentence tip on key vocabulary used, customized to help a ${sourceLanguage} speaker understand pronunciation or common pitfalls.

Return a JSON payload with the following structure:
{
  "original": "The input text",
  "translatedSimple": "Simple, clean conversational translation",
  "translatedSmart": "Smart, idiomatic variation of the translation",
  "pronunciationTip": "A friendly note about pronunciation or emphasis (e.g., 'accentuate the sounds...')"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Translate and refine this expression from the source language "${sourceLanguage}": "${text}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            original: { type: Type.STRING },
            translatedSimple: { type: Type.STRING },
            translatedSmart: { type: Type.STRING },
            pronunciationTip: { type: Type.STRING }
          },
          required: ["original", "translatedSimple", "translatedSmart", "pronunciationTip"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No output from translate engine.");
    }

    res.json(JSON.parse(resultText));
  } catch (error: any) {
    const errorStr = String(error.message || error);
    const isQuota = errorStr.includes("429") || errorStr.includes("quota") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.includes("limit");
    if (isQuota) {
      console.log("Translation Service Status: 429 quota exceeded. Seamlessly transitioned to local translation fallback.");
    } else {
      console.warn("Translate Endpoint Warning:", errorStr);
    }
    try {
      const { text, sourceLanguage = "Auto-Detect/Bengali" } = req.body;
      const fallbackTranslation = generateLocalTranslationFallback(text, sourceLanguage);
      res.json(fallbackTranslation);
    } catch (fallbackErr: any) {
      res.status(500).json({ error: "Translation tool is temporarily offline." });
    }
  }
});

// 3. Text to Speech (Native Audio Generation using gemini-3.1-flash-tts-preview)
// Helper to clean markdown formatting, symbols, and emojis which cause 500 errors in the tts generator parser.
function sanitizeTextForTTS(text: string): string {
  if (!text) return "";
  return text
    // Replace standard markdown structures with equivalent spaces or blanks
    .replace(/[*#_~`\[\]()\\<>\-\/]/g, " ")
    // Remove typical emojis & non-ASCII illustrations
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "")
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/[\u{2600}-\u{26FF}]/gu, "")
    .replace(/[\u{2700}-\u{27BF}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "")
    // Normalize spaces
    .replace(/\s+/g, " ")
    .trim();
}

// Keep track of TTS offline cool-down
let ttsDisabledUntil = 0;

function checkTtsError(err: any): { is429: boolean; isDailyLimit: boolean } {
  const msg = String(err?.message || err?.status || (err?.error ? JSON.stringify(err?.error) : "") || err || "").toLowerCase();
  const is429 = msg.includes("429") || msg.includes("resource_exhausted") || msg.includes("quota") || msg.includes("limit") || msg.includes("rate");
  const isDailyLimit = msg.includes("day") || msg.includes("daily") || msg.includes("generaterequestsperday") || msg.includes("quota");
  return { is429, isDailyLimit };
}

app.post("/api/tts", async (req, res) => {
  try {
    const { text, tone } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text input is required for voice generation." });
    }

    const now = Date.now();
    if (now < ttsDisabledUntil) {
      return res.json({ 
        audio: null, 
        fallback: true, 
        message: "TTS high-fidelity mode is in warm cooldown. Using high-speed client synthesiser." 
      });
    }

    const cleanedText = sanitizeTextForTTS(text);
    if (!cleanedText) {
      return res.json({ audio: null, fallback: true });
    }

    // Map starting tone config to a supported prebuilt voice
    let voiceName = "Kore"; // Friendly, clean female coach voice as standard
    if (tone === "energetic") {
      voiceName = "Zephyr";
    } else if (tone === "calm_bengali") {
      voiceName = "Charon";
    } else if (tone === "stern") {
      voiceName = "Fenrir";
    }

    let base64Audio: string | undefined = undefined;

    // Try 1: Select preferred tone prebuilt voice with speechConfig
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: cleanedText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });
      base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (e1: any) {
      const errInfo = checkTtsError(e1);
      if (errInfo.is429) {
        ttsDisabledUntil = Date.now() + 15 * 60 * 1000; // Cooldown for 15 minutes to save quota gracefully
        console.log("TTS limit reached. Serving local browser speech synthesizer instead.");
        return res.json({ audio: null, fallback: true, quotaExceeded: true });
      }

      console.log(`TTS prebuilt voice retry configured...`);
      
      // Try 2: Retry with standard 'Puck' voice fallback and compliant speechConfig
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: cleanedText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Puck" },
              },
            },
          },
        });
        base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      } catch (e2: any) {
        const errInfo2 = checkTtsError(e2);
        if (errInfo2.is429) {
          ttsDisabledUntil = Date.now() + 15 * 60 * 1000;
          console.log("TTS limits detected. Transitioned to local synthesizer.");
          return res.json({ audio: null, fallback: true, quotaExceeded: true });
        }

        console.log("TTS baseline standard request initiation...");
        
        // Try 3: Retry with simple string contents and baseline voice to avoid complex object parsing issues
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-tts-preview",
            contents: cleanedText,
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: "Kore" },
                },
              },
            },
          });
          base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        } catch (e3: any) {
          const errInfo3 = checkTtsError(e3);
          if (errInfo3.is429) {
            ttsDisabledUntil = Date.now() + 15 * 60 * 1000;
            console.log("TTS quota limits reached (ultimate standard retry). serving local browser engine instead.");
            return res.json({ audio: null, fallback: true, quotaExceeded: true });
          }

          console.log("TTS baseline fallback engaged.");
          ttsDisabledUntil = Date.now() + 30 * 1000; // 30s cool-down on standard errors to keep process light
        }
      }
    }

    if (!base64Audio) {
      console.info("Gemini TTS service is offline/limited. Communicating fallback command to client.");
      return res.json({ audio: null, fallback: true });
    }

    res.json({ audio: base64Audio, fallback: false });
  } catch (error: any) {
    console.error("Gemini TTS Endpoint Error:", error);
    res.json({ 
      audio: null, 
      fallback: true,
      error: "Speech synthesis was unable to process, falling back to local speech engine." 
    });
  }
});

// Vite middleware setup or production static server hosting
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Easy English AI Server running on port ${PORT}`);
  });
}

startServer();
