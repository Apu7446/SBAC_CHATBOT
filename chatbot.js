/**
 * SBAC Bank PLC - AI Chatbot Controller (Bilingual: English & বাংলা)
 * Supports:
 * 1. Intelligent Language Auto-Detection (English, Bengali, and Banglish)
 * 2. Manual Language Switcher Toggle (EN / বাং)
 * 3. Compact Popup Widget & Fullscreen Expandable Workspace
 * 4. Comprehensive Dual-Language Knowledgebase (100% Offline accurate)
 * 5. Multi-Provider AI (OpenRouter with Gemma/Llama, Google Gemini, OpenAI, Custom API)
 * 6. Speech-to-Text & Text-to-Speech
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // DOM Elements - Fullscreen Workspace
  // --------------------------------------------------------------------------
  const fullscreenChatModal = document.getElementById("fullscreenChatModal");
  const messagesContainer = document.getElementById("messagesContainer");
  const chatForm = document.getElementById("chatForm");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");
  const quickChips = document.getElementById("quickChips");
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const openSettingsQuickBtn = document.getElementById("openSettingsQuickBtn");
  const voiceInputBtn = document.getElementById("voiceInputBtn");
  const collapseFullviewBtn = document.getElementById("collapseFullviewBtn");
  const navbarLangBtn = document.getElementById("navbarLangBtn");
  const navbarLangText = document.getElementById("navbarLangText");

  // DOM Elements - Compact Popup Widget
  const chatbotFloatBtn = document.getElementById("chatbotFloatBtn");
  const chatWidgetPopup = document.getElementById("chatWidgetPopup");
  const floatSpeechBubble = document.getElementById("floatSpeechBubble");
  const closeFloatTooltipBtn = document.getElementById("closeFloatTooltipBtn");
  const widgetMessagesContainer = document.getElementById("widgetMessagesContainer");
  const widgetChatForm = document.getElementById("widgetChatForm");
  const widgetMessageInput = document.getElementById("widgetMessageInput");
  const widgetSendBtn = document.getElementById("widgetSendBtn");
  const widgetVoiceBtn = document.getElementById("widgetVoiceBtn");
  const widgetQuickChips = document.getElementById("widgetQuickChips");
  const widgetExpandBtn = document.getElementById("widgetExpandBtn");
  const widgetSoundBtn = document.getElementById("widgetSoundBtn");
  const widgetCloseBtn = document.getElementById("widgetCloseBtn");
  const widgetLangBtn = document.getElementById("widgetLangBtn");
  const widgetLangText = document.getElementById("widgetLangText");

  // Website Triggers
  const heroChatTriggerBtn = document.getElementById("heroChatTriggerBtn");
  const footerChatTriggerBtn = document.getElementById("footerChatTriggerBtn");
  const mobileNavToggle = document.getElementById("mobileNavToggle");
  const mainNav = document.getElementById("mainNav");

  // View Switcher Buttons
  const customerViewBtn = document.getElementById("customerViewBtn");
  const adminViewBtn = document.getElementById("adminViewBtn");

  // Status UI
  const activeEngineBadge = document.getElementById("activeEngineBadge");
  const activeEngineDesc = document.getElementById("activeEngineDesc");

  // Sidebar
  const sidebar = document.getElementById("sidebar");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");

  // Settings Modal elements
  const apiModalBtn = document.getElementById("apiModalBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  const resetDefaultBtn = document.getElementById("resetDefaultBtn");

  // Radio modes
  const modeBuiltIn = document.getElementById("modeBuiltIn");
  const modeOpenRouter = document.getElementById("modeOpenRouter");
  const modeGemini = document.getElementById("modeGemini");
  const modeOpenAI = document.getElementById("modeOpenAI");
  const modeCustom = document.getElementById("modeCustom");

  const modeBuiltInLabel = document.getElementById("modeBuiltInLabel");
  const modeOpenRouterLabel = document.getElementById("modeOpenRouterLabel");
  const modeGeminiLabel = document.getElementById("modeGeminiLabel");
  const modeOpenAILabel = document.getElementById("modeOpenAILabel");
  const modeCustomLabel = document.getElementById("modeCustomLabel");

  const openrouterFields = document.getElementById("openrouterFields");
  const geminiFields = document.getElementById("geminiFields");
  const openaiFields = document.getElementById("openaiFields");
  const customFields = document.getElementById("customFields");

  const openrouterApiKeyInput = document.getElementById("openrouterApiKey");
  const openrouterModelInput = document.getElementById("openrouterModel");
  const geminiApiKeyInput = document.getElementById("geminiApiKey");
  const geminiModelSelect = document.getElementById("geminiModel");
  const openaiApiKeyInput = document.getElementById("openaiApiKey");
  const openaiModelSelect = document.getElementById("openaiModel");
  const customEndpointUrlInput = document.getElementById("customEndpointUrl");
  const customApiKeyInput = document.getElementById("customApiKey");

  // --------------------------------------------------------------------------
  // App State
  // --------------------------------------------------------------------------
  let soundEnabled = true;
  let isGenerating = false;
  let isWidgetOpen = false;
  let isFullscreenOpen = false;
  let currentLang = localStorage.getItem("sbac_lang") || "bn"; // "bn" or "en"
  
  let currentViewMode = localStorage.getItem("sbac_view_mode") || "customer";
  let aiEngineMode = localStorage.getItem("sbac_ai_mode") || "builtin";
  let openrouterApiKey = localStorage.getItem("sbac_openrouter_key") || "";
  let openrouterModel = localStorage.getItem("sbac_openrouter_model") || "google/gemma-2-9b-it:free";
  let geminiApiKey = localStorage.getItem("sbac_gemini_key") || "";
  let geminiModel = localStorage.getItem("sbac_gemini_model") || "gemini-1.5-flash";
  let openaiApiKey = localStorage.getItem("sbac_openai_key") || "";
  let openaiModel = localStorage.getItem("sbac_openai_model") || "gpt-4o-mini";
  let customEndpoint = localStorage.getItem("sbac_custom_url") || "";
  let customApiKey = localStorage.getItem("sbac_custom_key") || "";

  const synth = window.speechSynthesis;

  if (window.marked) {
    marked.setOptions({ breaks: true, gfm: true });
  }

  // Initialize UI & Settings
  updateLanguageUI();
  applyViewMode(currentViewMode);
  initSettings();
  renderWelcomeMessage();

  // Auto-dismiss floating tooltip after 10s
  setTimeout(() => {
    if (floatSpeechBubble) {
      floatSpeechBubble.style.opacity = "0";
      setTimeout(() => floatSpeechBubble.style.display = "none", 400);
    }
  }, 10000);

  // --------------------------------------------------------------------------
  // Language Switcher Handlers
  // --------------------------------------------------------------------------
  if (navbarLangBtn) {
    navbarLangBtn.addEventListener("click", toggleLanguage);
  }
  if (widgetLangBtn) {
    widgetLangBtn.addEventListener("click", toggleLanguage);
  }

  function toggleLanguage() {
    currentLang = currentLang === "bn" ? "en" : "bn";
    localStorage.setItem("sbac_lang", currentLang);
    updateLanguageUI();

    const switchMsg = currentLang === "en"
      ? "🌐 **Language changed to English.** How can I assist you today?"
      : "🌐 **ভাষা বাংলায় পরিবর্তন করা হয়েছে।** আপনাকে কীভাবে সাহায্য করতে পারি?";
    appendBotMessage(switchMsg);
  }

  function updateLanguageUI() {
    const isBn = currentLang === "bn";
    const label = isBn ? "EN" : "বাং";
    if (navbarLangText) navbarLangText.innerText = label;
    if (widgetLangText) widgetLangText.innerText = label;

    // Update Placeholders
    if (messageInput) {
      messageInput.placeholder = isBn 
        ? "এসবিএসি ব্যাংক সম্পর্কে যেকোনো প্রশ্ন লিখুন (বাংলা, English বা বাংলিশ)..."
        : "Ask any question about SBAC Bank (English, Bengali, or Banglish)...";
    }
    if (widgetMessageInput) {
      widgetMessageInput.placeholder = isBn
        ? "আপনার প্রশ্ন লিখুন (বাংলা বা English)..."
        : "Type your query (English or বাংলা)...";
    }

    // Update Chips
    renderChipsForLanguage(currentLang);
  }

  function renderChipsForLanguage(lang) {
    const isEn = lang === "en";

    const chipsData = isEn ? [
      { text: "Account Opening Rules", icon: "fa-id-card", query: "What are the requirements to open a savings account?" },
      { text: "BanglaPay App", icon: "fa-mobile-screen", query: "What are the features of BanglaPay mobile app?" },
      { text: "DPS & FDR Schemes", icon: "fa-piggy-bank", query: "Tell me about DPS and Fixed Deposit schemes" },
      { text: "Customer Care", icon: "fa-headset", query: "What is SBAC Bank helpline and hotline number?" },
      { text: "Islamic Banking", icon: "fa-moon", query: "Tell me about Taqwa Islamic Banking services" },
      { text: "Cards & Privileges", icon: "fa-credit-card", query: "What are the features and benefits of credit cards?" },
      { text: "Loans & Interest", icon: "fa-hand-holding-dollar", query: "What loans and interest rates are available?" },
      { text: "Head Office & Hours", icon: "fa-building", query: "Where is the Head Office and what are banking hours?" }
    ] : [
      { text: "অ্যাকাউন্ট খোলার নিয়ম", icon: "fa-id-card", query: "সেভিংস অ্যাকাউন্ট খুলতে কি কি লাগবে?" },
      { text: "BanglaPay App", icon: "fa-mobile-screen", query: "BanglaPay অ্যাপের ফিচার কি কি?" },
      { text: "ডিপিএস ও FDR স্কিম", icon: "fa-piggy-bank", query: "ডিপিএস ও ফিক্সড ডিপোজিট স্কিম কি কি আছে?" },
      { text: "কাস্টমার কেয়ার", icon: "fa-headset", query: "হেল্পলাইন ও কাস্টমার কেয়ার নম্বর কত?" },
      { text: "ইসলামিক ব্যাংকিং", icon: "fa-moon", query: "Islamic Banking সেবা সম্পর্কে জানতে চাই" },
      { text: "কার্ড সেবা", icon: "fa-credit-card", query: "ক্রেডিট কার্ড এবং ডেবিট কার্ড সুবিধা কি?" },
      { text: "ঋণ সুবিধা", icon: "fa-hand-holding-dollar", query: "লোন এবং ইন্টারেস্ট রেট কেমন?" },
      { text: "হেড অফিস ও সময়", icon: "fa-building", query: "ব্যাংকিং সময়সূচি ও হেড অফিস কোথায়?" }
    ];

    if (quickChips) {
      quickChips.innerHTML = chipsData.map(c => `
        <button class="chip-btn" data-query="${c.query}">
          <i class="fa-solid ${c.icon}"></i> ${c.text}
        </button>
      `).join("");
    }

    if (widgetQuickChips) {
      widgetQuickChips.innerHTML = chipsData.slice(0, 5).map(c => `
        <button class="w-chip-btn" data-query="${c.query}">
          <i class="fa-solid ${c.icon}"></i> ${c.text}
        </button>
      `).join("");
    }
  }

  // --------------------------------------------------------------------------
  // Floating Launcher & Popup Widget Handlers
  // --------------------------------------------------------------------------
  if (chatbotFloatBtn) {
    chatbotFloatBtn.addEventListener("click", () => {
      if (isFullscreenOpen) {
        closeFullscreen();
      } else {
        toggleWidgetPopup();
      }
    });
  }

  if (closeFloatTooltipBtn) {
    closeFloatTooltipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      floatSpeechBubble.style.display = "none";
    });
  }

  if (widgetCloseBtn) {
    widgetCloseBtn.addEventListener("click", closeWidgetPopup);
  }

  // Expand to Fullscreen Workspace
  if (widgetExpandBtn) {
    widgetExpandBtn.addEventListener("click", openFullscreen);
  }

  // Collapse Fullscreen back to Widget
  if (collapseFullviewBtn) {
    collapseFullviewBtn.addEventListener("click", () => {
      closeFullscreen();
      openWidgetPopup();
    });
  }

  // Website Section Triggers
  if (heroChatTriggerBtn) {
    heroChatTriggerBtn.addEventListener("click", openWidgetPopup);
  }

  if (footerChatTriggerBtn) {
    footerChatTriggerBtn.addEventListener("click", openWidgetPopup);
  }

  // Product "তথ্য জানুন" buttons
  document.querySelectorAll(".query-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const query = btn.getAttribute("data-query");
      openWidgetPopup();
      if (query && !isGenerating) {
        setTimeout(() => {
          submitDirectQuery(query);
        }, 300);
      }
    });
  });

  // Mobile navigation hamburger toggle
  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener("click", () => {
      const isVisible = mainNav.style.display === "block";
      mainNav.style.display = isVisible ? "none" : "block";
    });
  }

  function toggleWidgetPopup() {
    if (isWidgetOpen) {
      closeWidgetPopup();
    } else {
      openWidgetPopup();
    }
  }

  function openWidgetPopup() {
    isWidgetOpen = true;
    chatWidgetPopup.classList.add("active");
    chatbotFloatBtn.classList.add("is-open");
    if (floatSpeechBubble) floatSpeechBubble.style.display = "none";
    setTimeout(() => {
      if (widgetMessageInput) widgetMessageInput.focus();
      scrollBothToBottom();
    }, 150);
  }

  function closeWidgetPopup() {
    isWidgetOpen = false;
    chatWidgetPopup.classList.remove("active");
    chatbotFloatBtn.classList.remove("is-open");
  }

  function openFullscreen() {
    isFullscreenOpen = true;
    closeWidgetPopup();
    fullscreenChatModal.classList.add("active");
    chatbotFloatBtn.classList.add("is-open");
    setTimeout(() => {
      if (messageInput) messageInput.focus();
      scrollBothToBottom();
    }, 200);
  }

  function closeFullscreen() {
    isFullscreenOpen = false;
    fullscreenChatModal.classList.remove("active");
    chatbotFloatBtn.classList.remove("is-open");
  }

  // Keyboard shortcut (Escape to close modals/widgets)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (settingsModal && settingsModal.classList.contains("active")) {
        settingsModal.classList.remove("active");
      } else if (isFullscreenOpen) {
        closeFullscreen();
      } else if (isWidgetOpen) {
        closeWidgetPopup();
      }
    }
  });

  // --------------------------------------------------------------------------
  // View Switcher (Customer vs Admin)
  // --------------------------------------------------------------------------
  if (customerViewBtn && adminViewBtn) {
    customerViewBtn.addEventListener("click", () => applyViewMode("customer"));
    adminViewBtn.addEventListener("click", () => applyViewMode("admin"));
  }

  function applyViewMode(mode) {
    currentViewMode = mode;
    localStorage.setItem("sbac_view_mode", mode);

    if (mode === "admin") {
      document.body.classList.remove("mode-customer");
      document.body.classList.add("mode-admin");
      if (adminViewBtn) adminViewBtn.classList.add("active");
      if (customerViewBtn) customerViewBtn.classList.remove("active");
    } else {
      document.body.classList.remove("mode-admin");
      document.body.classList.add("mode-customer");
      if (customerViewBtn) customerViewBtn.classList.add("active");
      if (adminViewBtn) adminViewBtn.classList.remove("active");
    }
  }

  // --------------------------------------------------------------------------
  // Chat Interaction Handlers (Synchronized)
  // --------------------------------------------------------------------------
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSendMessage(messageInput.value.trim());
    });
  }

  if (widgetChatForm) {
    widgetChatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSendMessage(widgetMessageInput.value.trim());
    });
  }

  if (messageInput) {
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage(messageInput.value.trim());
      }
    });

    messageInput.addEventListener("input", () => {
      messageInput.style.height = "auto";
      messageInput.style.height = Math.min(messageInput.scrollHeight, 100) + "px";
    });
  }

  if (widgetMessageInput) {
    widgetMessageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage(widgetMessageInput.value.trim());
      }
    });

    widgetMessageInput.addEventListener("input", () => {
      widgetMessageInput.style.height = "auto";
      widgetMessageInput.style.height = Math.min(widgetMessageInput.scrollHeight, 70) + "px";
    });
  }

  // Quick Chips in Fullscreen & Widget
  if (quickChips) {
    quickChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip-btn");
      if (chip && !isGenerating) {
        submitDirectQuery(chip.getAttribute("data-query"));
      }
    });
  }

  if (widgetQuickChips) {
    widgetQuickChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".w-chip-btn");
      if (chip && !isGenerating) {
        submitDirectQuery(chip.getAttribute("data-query"));
      }
    });
  }

  function submitDirectQuery(query) {
    if (!query || isGenerating) return;
    handleSendMessage(query);
  }

  // Sound toggles
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", toggleSound);
  }
  if (widgetSoundBtn) {
    widgetSoundBtn.addEventListener("click", toggleSound);
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    const soundIcon = soundEnabled 
      ? '<i class="fa-solid fa-volume-high"></i>' 
      : '<i class="fa-solid fa-volume-xmark"></i>';
    if (soundToggleBtn) soundToggleBtn.innerHTML = soundIcon;
    if (widgetSoundBtn) widgetSoundBtn.innerHTML = soundIcon;
  }

  if (clearChatBtn) {
    clearChatBtn.addEventListener("click", () => {
      if (confirm(currentLang === "en" ? "Do you want to clear the conversation?" : "আপনি কি কথোপকথন পরিষ্কার করতে চান?")) {
        if (messagesContainer) messagesContainer.innerHTML = "";
        if (widgetMessagesContainer) widgetMessagesContainer.innerHTML = "";
        renderWelcomeMessage();
      }
    });
  }

  if (mobileMenuBtn && closeSidebarBtn && sidebar) {
    mobileMenuBtn.addEventListener("click", () => sidebar.classList.add("active"));
    closeSidebarBtn.addEventListener("click", () => sidebar.classList.remove("active"));
  }

  // --------------------------------------------------------------------------
  // Speech Recognition (Mic Input)
  // --------------------------------------------------------------------------
  setupSpeechRecognition(voiceInputBtn, messageInput);
  setupSpeechRecognition(widgetVoiceBtn, widgetMessageInput);

  function setupSpeechRecognition(btn, targetInput) {
    if (!btn || !targetInput) return;

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = currentLang === "en" ? "en-US" : "bn-BD";

      btn.addEventListener("click", () => {
        try {
          recognition.lang = currentLang === "en" ? "en-US" : "bn-BD";
          btn.classList.add("listening");
          recognition.start();
        } catch (err) {
          recognition.stop();
          btn.classList.remove("listening");
        }
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        targetInput.value = transcript;
        btn.classList.remove("listening");
        targetInput.focus();
      };

      recognition.onerror = () => btn.classList.remove("listening");
      recognition.onend = () => btn.classList.remove("listening");
    } else {
      btn.style.display = "none";
    }
  }

  // --------------------------------------------------------------------------
  // Settings Modal Handlers
  // --------------------------------------------------------------------------
  if (openSettingsQuickBtn) {
    openSettingsQuickBtn.addEventListener("click", () => settingsModal.classList.add("active"));
  }
  if (apiModalBtn) {
    apiModalBtn.addEventListener("click", () => settingsModal.classList.add("active"));
  }
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => settingsModal.classList.remove("active"));
  }
  if (settingsModal) {
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) settingsModal.classList.remove("active");
    });
  }

  if (modeBuiltIn) modeBuiltIn.addEventListener("change", updateModalRadioUI);
  if (modeOpenRouter) modeOpenRouter.addEventListener("change", updateModalRadioUI);
  if (modeGemini) modeGemini.addEventListener("change", updateModalRadioUI);
  if (modeOpenAI) modeOpenAI.addEventListener("change", updateModalRadioUI);
  if (modeCustom) modeCustom.addEventListener("change", updateModalRadioUI);

  // Quick OpenRouter model tags
  document.querySelectorAll(".openrouter-model-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const model = btn.getAttribute("data-model");
      if (openrouterModelInput && model) {
        openrouterModelInput.value = model;
      }
    });
  });

  document.querySelectorAll(".btn-show-pass").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input) {
        const isPass = input.type === "password";
        input.type = isPass ? "text" : "password";
        btn.innerHTML = isPass ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
      }
    });
  });

  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener("click", () => {
      if (modeBuiltIn) modeBuiltIn.checked = true;
      updateModalRadioUI();
      saveSettings();
    });
  }

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", saveSettings);
  }

  function saveSettings() {
    if (modeOpenRouter && modeOpenRouter.checked) aiEngineMode = "openrouter";
    else if (modeGemini && modeGemini.checked) aiEngineMode = "gemini";
    else if (modeOpenAI && modeOpenAI.checked) aiEngineMode = "openai";
    else if (modeCustom && modeCustom.checked) aiEngineMode = "custom";
    else aiEngineMode = "builtin";

    if (openrouterApiKeyInput) openrouterApiKey = openrouterApiKeyInput.value.trim();
    if (openrouterModelInput) openrouterModel = openrouterModelInput.value.trim() || "google/gemma-2-9b-it:free";
    if (geminiApiKeyInput) geminiApiKey = geminiApiKeyInput.value.trim();
    if (geminiModelSelect) geminiModel = geminiModelSelect.value;
    if (openaiApiKeyInput) openaiApiKey = openaiApiKeyInput.value.trim();
    if (openaiModelSelect) openaiModel = openaiModelSelect.value;
    if (customEndpointUrlInput) customEndpoint = customEndpointUrlInput.value.trim();
    if (customApiKeyInput) customApiKey = customApiKeyInput.value.trim();

    localStorage.setItem("sbac_ai_mode", aiEngineMode);
    localStorage.setItem("sbac_openrouter_key", openrouterApiKey);
    localStorage.setItem("sbac_openrouter_model", openrouterModel);
    localStorage.setItem("sbac_gemini_key", geminiApiKey);
    localStorage.setItem("sbac_gemini_model", geminiModel);
    localStorage.setItem("sbac_openai_key", openaiApiKey);
    localStorage.setItem("sbac_openai_model", openaiModel);
    localStorage.setItem("sbac_custom_url", customEndpoint);
    localStorage.setItem("sbac_custom_key", customApiKey);

    updateSidebarEngineBadge();
    if (settingsModal) settingsModal.classList.remove("active");

    let engineName = "বিল্ট-ইন অফলাইন মোড (Zero Config)";
    if (aiEngineMode === "openrouter") engineName = `OpenRouter (${openrouterModel})`;
    else if (aiEngineMode === "gemini") engineName = `Google Gemini (${geminiModel})`;
    else if (aiEngineMode === "openai") engineName = `OpenAI (${openaiModel})`;
    else if (aiEngineMode === "custom") engineName = "Custom API Endpoint";

    appendBotMessage(`⚙️ **AI Engine Updated!** Current Engine: **${engineName}**.`);
  }

  function initSettings() {
    if (modeOpenRouter && aiEngineMode === "openrouter") modeOpenRouter.checked = true;
    else if (modeGemini && aiEngineMode === "gemini") modeGemini.checked = true;
    else if (modeOpenAI && aiEngineMode === "openai") modeOpenAI.checked = true;
    else if (modeCustom && aiEngineMode === "custom") modeCustom.checked = true;
    else if (modeBuiltIn) modeBuiltIn.checked = true;

    if (openrouterApiKey && openrouterApiKeyInput) openrouterApiKeyInput.value = openrouterApiKey;
    if (openrouterModel && openrouterModelInput) openrouterModelInput.value = openrouterModel;
    if (geminiApiKey && geminiApiKeyInput) geminiApiKeyInput.value = geminiApiKey;
    if (geminiModel && geminiModelSelect) geminiModelSelect.value = geminiModel;
    if (openaiApiKey && openaiApiKeyInput) openaiApiKeyInput.value = openaiApiKey;
    if (openaiModel && openaiModelSelect) openaiModelSelect.value = openaiModel;
    if (customEndpoint && customEndpointUrlInput) customEndpointUrlInput.value = customEndpoint;
    if (customApiKey && customApiKeyInput) customApiKeyInput.value = customApiKey;

    updateModalRadioUI();
    updateSidebarEngineBadge();
  }

  function updateModalRadioUI() {
    [modeBuiltInLabel, modeOpenRouterLabel, modeGeminiLabel, modeOpenAILabel, modeCustomLabel].forEach(el => el && el.classList.remove("active"));
    [openrouterFields, geminiFields, openaiFields, customFields].forEach(el => el && (el.style.display = "none"));

    if (modeOpenRouter && modeOpenRouter.checked) {
      if (modeOpenRouterLabel) modeOpenRouterLabel.classList.add("active");
      if (openrouterFields) openrouterFields.style.display = "block";
    } else if (modeGemini && modeGemini.checked) {
      if (modeGeminiLabel) modeGeminiLabel.classList.add("active");
      if (geminiFields) geminiFields.style.display = "block";
    } else if (modeOpenAI && modeOpenAI.checked) {
      if (modeOpenAILabel) modeOpenAILabel.classList.add("active");
      if (openaiFields) openaiFields.style.display = "block";
    } else if (modeCustom && modeCustom.checked) {
      if (modeCustomLabel) modeCustomLabel.classList.add("active");
      if (customFields) customFields.style.display = "block";
    } else {
      if (modeBuiltInLabel) modeBuiltInLabel.classList.add("active");
    }
  }

  function updateSidebarEngineBadge() {
    if (!activeEngineBadge || !activeEngineDesc) return;

    if (aiEngineMode === "openrouter") {
      activeEngineBadge.className = "status-pill live-gemini";
      activeEngineBadge.innerHTML = '<i class="fa-solid fa-cloud"></i> OpenRouter AI';
      activeEngineDesc.innerText = `OpenRouter (${openrouterModel}) এর সাথে সংযুক্ত।`;
    } else if (aiEngineMode === "gemini") {
      activeEngineBadge.className = "status-pill live-gemini";
      activeEngineBadge.innerHTML = '<i class="fa-solid fa-sparkles"></i> Gemini Live AI';
      activeEngineDesc.innerText = "Connected with Google Gemini API.";
    } else if (aiEngineMode === "openai") {
      activeEngineBadge.className = "status-pill live-openai";
      activeEngineBadge.innerHTML = '<i class="fa-solid fa-robot"></i> OpenAI Live';
      activeEngineDesc.innerText = `Connected with OpenAI (${openaiModel}).`;
    } else if (aiEngineMode === "custom") {
      activeEngineBadge.className = "status-pill live-custom";
      activeEngineBadge.innerHTML = '<i class="fa-solid fa-network-wired"></i> Custom API';
      activeEngineDesc.innerText = "Connected to custom endpoint.";
    } else {
      activeEngineBadge.className = "status-pill offline";
      activeEngineBadge.innerHTML = '<i class="fa-solid fa-bolt"></i> অফলাইন মোড';
      activeEngineDesc.innerText = "Zero Config: sbac_bank_info.txt থেকে সরাসরি উত্তর দিচ্ছে।";
    }
  }

  // --------------------------------------------------------------------------
  // Core Message Send & Processing Controller
  // --------------------------------------------------------------------------
  function handleSendMessage(text) {
    if (!text || isGenerating) return;

    if (messageInput) {
      messageInput.value = "";
      messageInput.style.height = "auto";
    }
    if (widgetMessageInput) {
      widgetMessageInput.value = "";
      widgetMessageInput.style.height = "auto";
    }

    appendUserMessage(text);
    playSendSound();

    isGenerating = true;
    const typingRows = appendTypingIndicator();

    setTimeout(async () => {
      try {
        let responseHtml = "";

        if (aiEngineMode === "openrouter" && openrouterApiKey) {
          responseHtml = await fetchOpenRouterResponse(text);
        } else if (aiEngineMode === "gemini" && geminiApiKey) {
          responseHtml = await fetchGeminiResponse(text);
        } else if (aiEngineMode === "openai" && openaiApiKey) {
          responseHtml = await fetchOpenAIResponse(text);
        } else if (aiEngineMode === "custom" && customEndpoint) {
          responseHtml = await fetchCustomApiResponse(text);
        } else {
          responseHtml = generateBuiltInResponse(text);
        }

        removeTypingIndicators(typingRows);
        appendBotMessage(responseHtml);
        playReceiveSound();
      } catch (err) {
        console.error("Chatbot error:", err);
        removeTypingIndicators(typingRows);
        if (aiEngineMode !== "builtin") {
          const fallbackAns = generateBuiltInResponse(text);
          const isEn = detectQueryLanguage(text) === "en";
          const engineLabel = aiEngineMode === "openrouter" ? "OpenRouter" : aiEngineMode === "gemini" ? "Google Gemini" : aiEngineMode === "openai" ? "OpenAI" : "Custom API";
          const note = isEn
            ? `⚠️ **${engineLabel} Connection Note:** ${err.message || "Invalid Key / Quota limit"}\n\n*Delivering verified answer from SBAC knowledge base:*\n\n`
            : `⚠️ **${engineLabel} এপিআই নোটিশ:** ${err.message || "Invalid Key / কোটা সমস্যা"}\n\n*এসবিএসি অফলাইন নলেজবেস থেকে নির্ভুল উত্তর দেওয়া হলো:*\n\n`;
          appendBotMessage(`${note}${fallbackAns}`);
        } else {
          appendBotMessage(currentLang === "en"
            ? "Sorry, an error occurred. Please call our 24/7 hotline at **16327**."
            : "দুঃখিত, কোনো সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি আমাদের হটলাইন **১৬৩২৭** এ কল করুন।");
        }
      } finally {
        isGenerating = false;
      }
    }, 350);
  }

  // --------------------------------------------------------------------------
  // DOM Message Rendering (Appends to both Containers)
  // --------------------------------------------------------------------------
  function appendUserMessage(text) {
    const time = getCurrentTime();
    const html = `
      <div class="msg-avatar"><i class="fa-regular fa-user"></i></div>
      <div class="msg-bubble-wrap">
        <div class="msg-bubble">${escapeHtml(text)}</div>
        <div class="msg-meta"><span>${time}</span></div>
      </div>
    `;

    createAndAppendRow("user", html);
    scrollBothToBottom();
  }

  function appendBotMessage(rawText) {
    const time = getCurrentTime();
    const formattedHtml = parseMarkdown(rawText);

    const html = `
      <div class="msg-avatar"><i class="fa-solid fa-headset"></i></div>
      <div class="msg-bubble-wrap">
        <div class="msg-bubble">${formattedHtml}</div>
        <div class="msg-meta">
          <span>${time}</span> • <span>SBAC Assistant</span>
          <button class="btn-tts" title="Listen / শুনুন"><i class="fa-solid fa-volume-high"></i></button>
          <button class="btn-copy" title="Copy / কপি করুন"><i class="fa-regular fa-copy"></i></button>
        </div>
      </div>
    `;

    const rows = createAndAppendRow("bot", html);

    rows.forEach(row => {
      const ttsBtn = row.querySelector(".btn-tts");
      const copyBtn = row.querySelector(".btn-copy");

      if (ttsBtn) {
        ttsBtn.addEventListener("click", () => {
          speakText(row.querySelector(".msg-bubble").innerText);
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(row.querySelector(".msg-bubble").innerText);
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
          setTimeout(() => copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>', 2000);
        });
      }
    });

    scrollBothToBottom();
  }

  function createAndAppendRow(type, innerHtml) {
    const rows = [];
    [messagesContainer, widgetMessagesContainer].forEach(container => {
      if (container) {
        const row = document.createElement("div");
        row.className = `message-row ${type}`;
        row.innerHTML = innerHtml;
        container.appendChild(row);
        rows.push(row);
      }
    });
    return rows;
  }

  function appendTypingIndicator() {
    const typingHtml = `
      <div class="msg-avatar"><i class="fa-solid fa-headset"></i></div>
      <div class="msg-bubble-wrap">
        <div class="msg-bubble typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;

    const rows = [];
    [messagesContainer, widgetMessagesContainer].forEach(container => {
      if (container) {
        const row = document.createElement("div");
        row.className = "message-row bot typing-row";
        row.innerHTML = typingHtml;
        container.appendChild(row);
        rows.push(row);
      }
    });
    scrollBothToBottom();
    return rows;
  }

  function removeTypingIndicators(rows) {
    if (rows && rows.length) {
      rows.forEach(row => {
        if (row && row.parentNode) row.parentNode.removeChild(row);
      });
    }
  }

  function scrollBothToBottom() {
    if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
    if (widgetMessagesContainer) widgetMessagesContainer.scrollTop = widgetMessagesContainer.scrollHeight;
  }

  function renderWelcomeMessage() {
    const welcomeText = currentLang === "en" ? `### 👋 Welcome to SBAC Bank PLC AI Assistant

I am the official AI banking assistant of **South Bangla Agriculture and Commerce Bank PLC**. I am here 24/7 to answer all your inquiries regarding bank accounts, DPS schemes, loans, cards, and digital banking services in English, Bengali, or Banglish.

> 💡 **Quick Banking Information:**
> - **Account Opening:** Savings, Current, Student & Probashi (NRB) Accounts
> - **Deposits & DPS:** Fixed Deposit (FDR), Double & Triple Growth Schemes
> - **Digital Banking:** BanglaPay Mobile App, instant bKash/Nagad transfers
> - **Cards & Loans:** Dual Currency Credit Cards, Home & Personal Loans
> - **Contact:** 24/7 Hotline 16327 & Head Office Motijheel, Dhaka

<div class="action-btn-group">
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> Call 16327</a>
  <a href="https://sbacdigital.com" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-user-plus"></i> Open Account Online</a>
  <a href="https://www.sbacbank.com/locations" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-map-pin"></i> Branch Locator</a>
</div>` : `### 👋 স্বাগতম! Welcome to SBAC Bank PLC AI Assistant

আমি **সাউথ বাংলা এগ্রিকালচার অ্যান্ড কমার্স (এসবিএসি) ব্যাংকের** অফিসিয়াল ডিজিটাল অ্যাসিস্ট্যান্ট। ব্যাংক অ্যাকাউন্ট, ডিপিএস, লোন, কার্ড ও ডিজিটাল ব্যাংকিং সংক্রান্ত যেকোনো তথ্যের জন্য আমি প্রস্তুত (বাংলা, ইংরেজি ও বাংলিশ)।

> 💡 **আপনার সুবিধার্থে কিছু প্রধান তথ্য:**
> - **অ্যাকাউন্ট খোলার নিয়ম:** সেভিংস, কারেন্ট, স্টুডেন্ট ও প্রবাসী হিসাব
> - **ডিপোজিট ও ডিপিএস:** ফিক্সড ডিপোজিট (FDR), দ্বিগুণ ও তিনগুণ বৃদ্ধি স্কিম
> - **ডিজিটাল সেবা:** BanglaPay মোবাইল অ্যাপ, ইনস্ট্যান্ট বিকাশ/নগদ ট্রান্সফার
> - **কার্ড ও লোন:** ডুয়েল কারেন্সি ক্রেডিট কার্ড, পার্সোনাল ও হাউজিং লোন
> - **যোগাযোগ:** হটলাইন ১৬৩২৭ ও হেড অফিস মতিঝিল

<div class="action-btn-group">
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> Call 16327</a>
  <a href="https://sbacdigital.com" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-user-plus"></i> Open Account Online</a>
  <a href="https://www.sbacbank.com/locations" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-map-pin"></i> Branch Locator</a>
</div>`;

    appendBotMessage(welcomeText);
  }

  // --------------------------------------------------------------------------
  // Intelligent Language Detector
  // --------------------------------------------------------------------------
  function detectQueryLanguage(text) {
    // 1. If contains Bengali unicode characters -> Bengali
    if (/[\u0980-\u09FF]/.test(text)) return "bn";

    const clean = text.toLowerCase();
    const words = clean.split(/[\s,?.!]+/);

    // 2. Common Banglish keywords/patterns
    const banglishMarkers = [
      "ki", "kivabe", "kibabe", "koto", "kothay", "koi", "lagbe", "khulbo", "ase", "achhe", 
      "bolo", "bolun", "dorkar", "chai", "korbo", "hobe", "shuru", "taka", "apnar", "amar", 
      "apnader", "ekta", "jeno", "janate", "parben", "sob", "shob", "nibo", "deben", "te", 
      "er", "jonno", "korte", "hobe", "bistarito", "niyom"
    ];

    const hasBanglish = words.some(w => banglishMarkers.includes(w));
    if (hasBanglish) return "bn";

    // 3. If explicit English words/queries
    const englishMarkers = [
      "how", "what", "where", "when", "why", "who", "is", "are", "can", "tell", "need", "want",
      "open", "account", "savings", "current", "student", "loan", "card", "dps", "fdr", "branch",
      "hotline", "helpline", "banglapay", "app", "islamic", "rate", "interest", "swift", "fee",
      "charges", "location", "contact", "support", "help", "information", "deposit", "scheme"
    ];

    const englishWordCount = words.filter(w => englishMarkers.includes(w)).length;
    if (englishWordCount >= 1 || currentLang === "en") {
      return "en";
    }

    return currentLang;
  }

  // --------------------------------------------------------------------------
  // Built-in Bilingual Knowledge Base Query Engine (100% Offline accurate)
  // --------------------------------------------------------------------------
  function generateBuiltInResponse(userInput) {
    const q = userInput.toLowerCase().trim();
    const lang = detectQueryLanguage(userInput);
    const isEn = lang === "en";

    // 1. Hotline / Helpline / Contact
    if (q.includes("হটলাইন") || q.includes("ফোন") || q.includes("কল সেন্টার") || q.includes("কাস্টমার কেয়ার") || q.includes("help") || q.includes("contact") || q.includes("hotline") || q.includes("helpline") || q.includes("phone") || q.includes("number") || q.includes("call") || q.includes("নম্বর")) {
      if (isEn) {
        return `### 📞 SBAC Bank Customer Care & 24/7 Hotline

- **24/7 Helpline (From any mobile in Bangladesh):** **16327**
- **Overseas & International Callers:** **+880 9612 016327** or **09611-016327**
- **Email Support:** [info@sbacbank.com](mailto:info@sbacbank.com)
- **Head Office:** BSC Tower (5th - 16th Floor), 2-3 Rajuk Avenue, Motijheel, Dhaka-1000.

<div class="action-btn-group">
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> Call 16327</a>
  <a href="https://www.sbacbank.com/locations" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-map-location-dot"></i> Branch Locator</a>
</div>`;
      } else {
        return `### 📞 SBAC Bank কাস্টমার কেয়ার ও হটলাইন

- **২৪/৭ হেল্পলাইন (যেকোনো মোবাইল থেকে):** **16327**
- **বিদেশ থেকে বা ওভারসিজ কলারদের জন্য:** **+880 9612 016327** / **09611-016327**
- **ইমেইল সাপোর্ট:** [info@sbacbank.com](mailto:info@sbacbank.com)
- **হেড অফিস:** বিএসসি টাওয়ার (৫ম-১৬তম তলা), ২-৩ রাজউক এভিনিউ, মতিঝিল, ঢাকা-১০০০।

<div class="action-btn-group">
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> কল করুন 16327</a>
  <a href="https://www.sbacbank.com/locations" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-map-location-dot"></i> ব্রাঞ্চ লোকেশন</a>
</div>`;
      }
    }

    // 2. BanglaPay Mobile App
    if (q.includes("banglapay") || q.includes("বাংলাপে") || q.includes("অ্যাপ") || q.includes("mobile banking") || q.includes("মোবাইল ব্যাংকিং") || q.includes("bkash") || q.includes("nagad") || q.includes("বিকাশ") || q.includes("নগদ") || q.includes("features")) {
      if (isEn) {
        return `### 📱 BanglaPay Mobile Banking App

**BanglaPay** is SBAC Bank's official next-generation smart digital banking application.

**Key Features & Services:**
- ⚡ **24/7 Real-Time Funds Transfer:** Instant transfer to SBAC accounts and other banks via NPSB, BEFTN & RTGS.
- 💸 **Instant Wallet Transfer:** Send money directly to **bKash, Nagad, and Rocket** wallets.
- 🛍️ **Bangla QR Payment:** Contactless QR code payments at merchant outlets & supermarkets.
- 💡 **Utility Bill Pay & Mobile Recharge:** Pay Electricity, Gas, Water, Internet bills & top-up GP, Robi, BL, Airtel, Teletalk.
- 🛡️ **Biometric Security:** Fingerprint & Face-ID biometric authentication with instant transaction alerts.

<div class="action-btn-group">
  <a href="https://play.google.com/store/apps/details?id=com.sbac&hl=en&gl=US" target="_blank" class="bubble-action-btn"><i class="fa-brands fa-google-play"></i> Google Play</a>
  <a href="https://apps.apple.com/us/app/banglapay/id1445566322" target="_blank" class="bubble-action-btn"><i class="fa-brands fa-apple"></i> App Store</a>
  <a href="https://ibank.sbacbank.com:8080" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-globe"></i> Web Portal</a>
</div>`;
      } else {
        return `### 📱 BanglaPay ডিজিটাল মোবাইল ব্যাংকিং অ্যাপ

**BanglaPay** হলো SBAC ব্যাংকের অফিশিয়াল স্মার্ট ব্যাংকিং অ্যাপ্লিকেশন।

**প্রধান সুবিধাসমূহ:**
- ২৪/৭ রিয়েল-টাইম ব্যালেন্স অনুসন্ধান ও ইনস্ট্যান্ট ফান্ড ট্রান্সফার (NPSB, BEFTN)
- বিকাশ (bKash), নগদ (Nagad) ও রকেট ওয়ালেটে সরাসরি টাকা পাঠানো
- বাংলা কিউআর (Bangla QR) এর মাধ্যমে দোকানে কেনাকাটার বিল পেমেন্ট
- বিদ্যুৎ, গ্যাস, পানি, ইন্টারনেট ইউটিলিটি বিল পরিশোধ ও মোবাইল রিচার্জ
- বায়োমেট্রিক নিরাপত্তা (ফিঙ্গারপ্রিন্ট ও ফেস-আইডি)

<div class="action-btn-group">
  <a href="https://play.google.com/store/apps/details?id=com.sbac&hl=en&gl=US" target="_blank" class="bubble-action-btn"><i class="fa-brands fa-google-play"></i> Google Play</a>
  <a href="https://apps.apple.com/us/app/banglapay/id1445566322" target="_blank" class="bubble-action-btn"><i class="fa-brands fa-apple"></i> App Store</a>
  <a href="https://ibank.sbacbank.com:8080" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-globe"></i> Web Portal</a>
</div>`;
      }
    }

    // 3. Savings / Account Opening / e-KYC
    if (q.includes("সেভিংস") || q.includes("সঞ্চয়") || q.includes("savings") || q.includes("open account") || q.includes("ekyc") || q.includes("e-kyc") || (q.includes("অ্যাকাউন্ট") && (q.includes("খুলতে") || q.includes("নিয়ম") || q.includes("কাগজপত্র") || q.includes("ডকুমেন্ট") || q.includes("requirement") || q.includes("document")))) {
      if (isEn) {
        return `### 🏦 Savings Account Opening Requirements & Rules

**Required Documents:**
1. **Applicant's Info:** 2 copies of passport-size photographs, valid National ID (NID) / Passport / Birth Certificate copy.
2. **Nominee's Info:** 1 passport-size photograph and valid NID copy of the nominee.
3. **Address Verification:** Recent utility bill copy (Electricity / Gas / Water).
4. **Initial Minimum Deposit:** Only Tk 1,000.

> ⚡ **Open Online in 5 Minutes (e-KYC):** You can open a paperless bank account right from home with just your NID and selfie at [sbacdigital.com](https://sbacdigital.com).

<div class="action-btn-group">
  <a href="https://sbacdigital.com" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-bolt"></i> Open Account Online</a>
  <a href="https://www.sbacbank.com/forms" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-download"></i> Download Forms</a>
</div>`;
      } else {
        return `### 🏦 সেভিংস অ্যাকাউন্ট খোলার নিয়ম ও প্রয়োজনীয় ডকুমেন্টস

**প্রয়োজনীয় কাগজপত্র:**
1. **গ্রাহকের তথ্য:** ২ কপি পাসপোর্ট সাইজ ছবি, জাতীয় পরিচয়পত্র (NID) / পাসপোর্ট / জন্ম নিবন্ধনের কপি।
2. **নমিনির তথ্য:** ১ কপি পাসপোর্ট সাইজ ছবি ও জাতীয় পরিচয়পত্র (NID) কপি।
3. **ঠিকানার প্রমাণ:** সাম্প্রতিক ইউটিলিটি বিলের কপি (বিদ্যুৎ/গ্যাস/পানি)।
4. **প্রাথমিক জমা:** মাত্র ১,০০০ টাকা।

> ⚡ **ঘরে বসেই অনলাইন অ্যাকাউন্ট:** কোনো শাখায় না গিয়ে সরাসরি [sbacdigital.com](https://sbacdigital.com) থেকে ৫ মিনিটেই পেপারলেস ই-কেওয়াইসি অ্যাকাউন্ট খুলতে পারবেন।

<div class="action-btn-group">
  <a href="https://sbacdigital.com" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-bolt"></i> ই-কেওয়াইসি অ্যাকাউন্ট খুলুন</a>
  <a href="https://www.sbacbank.com/forms" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-download"></i> ফরম ডাউনলোড</a>
</div>`;
      }
    }

    // 4. DPS / Fixed Deposit (FDR) / Term Schemes
    if (q.includes("ডিপিএস") || q.includes("dps") || q.includes("fdr") || q.includes("ফিক্সড") || q.includes("ডিপোজিট") || q.includes("deposit") || q.includes("double") || q.includes("triple") || q.includes("দ্বিগুণ") || q.includes("লাখপতি") || q.includes("কোটিপতি")) {
      if (isEn) {
        return `### 💰 SBAC Bank High-Yield Deposit & DPS Schemes

1. **Monthly Savings Scheme (DPS):** Flexible monthly installments starting from Tk 500 up to 10-year tenures with attractive compounding profit rates.
2. **Fixed Deposit Receipt (FDR):** 1, 3, 6, 12, 24, or 36 months flexible tenure with guaranteed returns.
3. **Double Benefit Scheme (DBS):** Doubles your one-time principal deposit in a specified timeframe.
4. **Triple Benefit Scheme (TBS):** Triples your investment over a longer tenure safely.
5. **Monthly Benefit Scheme (MIS/MBS):** Deposit a lump sum and receive fixed monthly profit payouts for household expenses.
6. **Lakhopoti & Kotipoti Schemes:** Build a targeted 1 Lakh or 1 Crore fund with easy affordable monthly installments.

<div class="action-btn-group">
  <a href="https://www.sbacbank.com/emi-calculator" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-calculator"></i> DPS Calculator</a>
  <a href="https://www.sbacbank.com/interest-rates" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-percent"></i> Interest Rates</a>
</div>`;
      } else {
        return `### 💰 SBAC ব্যাংকের আকর্ষণীয় ডিপোজিট ও ডিপিএস স্কিমসমূহ

1. **Monthly Savings Scheme (DPS):** প্রতি মাসে ৫০০ টাকা থেকে শুরু করে ১ থেকে ১০ বছর মেয়াদে আকর্ষণীয় মুনাফা।
2. **Fixed Deposit Receipt (FDR):** ১, ৩, ৬, ১২, ২৪ বা ৩৬ মাসের মেয়াদে সর্বোচ্চ মুনাফার নিশ্চয়তা।
3. **Double Benefit Scheme (দ্বিগুণ বৃদ্ধি):** নির্দিষ্ট মেয়াদে এককালীন জমার টাকা দ্বিগুণ হওয়ার সুযোগ।
4. **Triple Benefit Scheme (তিনগুণ বৃদ্ধি):** দীর্ঘমেয়াদী সঞ্চয়ে জমার টাকা তিনগুণ বৃদ্ধি।
5. **Monthly Benefit Scheme (মাসিক মুনাফা):** এককালীন টাকা জমা রেখে প্রতি মাসে সংসার খরচের জন্য নির্দিষ্ট মুনাফা।
6. **লাখপতি ও কোটিপতি স্কিম:** সহজ মাসিক কিস্তিতে ১ লাখ বা ১ কোটি টাকার বড় তহবিল গঠন।

<div class="action-btn-group">
  <a href="https://www.sbacbank.com/emi-calculator" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-calculator"></i> ডিপিএস ক্যালকুলেটর</a>
  <a href="https://www.sbacbank.com/interest-rates" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-percent"></i> মুনাফার হার</a>
</div>`;
      }
    }

    // 5. Islamic Banking (Taqwa)
    if (q.includes("islamic") || q.includes("islam") || q.includes("taqwa") || q.includes("shariah") || q.includes("ইসলামিক") || q.includes("তাকওয়া") || q.includes("শরিয়াহ") || q.includes("সুদবিহীন") || q.includes("মুদারাবা") || q.includes("mudaraba")) {
      if (isEn) {
        return `### 🌙 Taqwa Islamic Banking — SBAC Bank PLC

SBAC Bank provides 100% Shariah-compliant Islamic Banking solutions supervised by an independent Shariah Supervisory Committee.

**Featured Islamic Products:**
- **Mudaraba Savings Deposit (MSD)** & Al-Wadeeah Current Account (AWDA)
- **Mudaraba Monthly Savings Scheme (MMSS / Islamic DPS)**
- **Mudaraba Lakhopoti & Kotipoti Deposit Schemes**
- **Mudaraba Hajj & Umrah Savings Scheme**
- **Murabaha & Ijara Investment:** Shariah-compliant Home, Auto, and Commercial asset financing.

<div class="action-btn-group">
  <a href="https://www.sbacbank.com" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-moon"></i> Islamic Banking</a>
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> Inquire (16327)</a>
</div>`;
      } else {
        return `### 🌙 তাকওয়া (Taqwa) ইসলামিক ব্যাংকিং — SBAC Bank PLC

SBAC ব্যাংক সম্পূর্ণ শরীয়াহ সম্মত ইসলামিক ব্যাংকিং সেবা প্রদান করে থাকে।

**জনপ্রিয় ইসলামিক পণ্যসমূহ:**
- **মুদারাবা সঞ্চয়ী হিসাব (MSD)** ও মুদারাবা চলতি হিসাব (AWDA)
- **মুদারাবা মান্থলি সেভিংস স্কিম (MMSS / ডিপিএস)**
- **মুদারাবা কোটিপতি ও লাখপতি ডিপোজিট স্কিম**
- **মুদারাবা হজ সঞ্চয় স্কিম (Mudaraba Hajj Scheme)**
- **মুরাবাহা ও ইজারা বিনিয়োগ (হাউজ ও কমার্শিয়াল ফাইন্যান্সিং)**

<div class="action-btn-group">
  <a href="https://www.sbacbank.com" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-moon"></i> তাকওয়া ইসলামিক সেবা</a>
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> বিস্তারিত জানতে কল করুন</a>
</div>`;
      }
    }

    // 6. Loans / Credit & Financing
    if (q.includes("লোন") || q.includes("ঋণ") || q.includes("loan") || q.includes("borrow") || q.includes("mortgage") || q.includes("home loan") || q.includes("personal loan") || q.includes("car loan") || q.includes("auto loan") || q.includes("agri") || q.includes("sme")) {
      if (isEn) {
        return `### 🏢 SBAC Bank Loans & Financing Facilities

- **Home Loan:** Financing up to Tk 2 Crore for apartment purchase, house construction, or renovation with easy monthly installments.
- **Personal Loan:** Collateral-free quick personal loans for salaried professionals and businessmen.
- **Auto / Car Loan:** Attractive financing for brand new or reconditioned personal/commercial vehicles.
- **Agriculture Loan:** Easy financing for crop cultivation, dairy, poultry, fisheries, and agro equipment.
- **CMSME & Women Entrepreneur Loan:** Customized SME term loans and working capital facilities with concessional rates.

<div class="action-btn-group">
  <a href="https://www.sbacbank.com/emi-calculator" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-calculator"></i> Loan EMI Calculator</a>
  <a href="https://www.sbacbank.com/locations" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-building"></i> Nearest Branch</a>
</div>`;
      } else {
        return `### 🏢 SBAC ব্যাংক লোন ও অর্থায়ন সুবিধাসমূহ

- **Home Loan (গৃহ ঋণ):** ফ্ল্যাট ক্রয় বা বাড়ি নির্মাণের জন্য সহজ কিস্তিতে সর্বোচ্চ গৃহ ঋণ।
- **Personal Loan (ব্যক্তিগত ঋণ):** চাকরিজীবী ও ব্যবসায়ীদের জরুরি প্রয়োজনে জামানতবিহীন লোন।
- **Auto / Car Loan (গাড়ি ঋণ):** ব্যক্তিগত বা বাণিজ্যিক গাড়ি ক্রয়ের জন্য সহজ ঋণ।
- **Agriculture Loan (কৃষি ঋণ):** ফসল চাষ, ডেইরি, পোল্ট্রি, মৎস্য ও কৃষি যন্ত্রপাতিতে সহজ ঋণ।
- **CMSME & নারী উদ্যোক্তা ঋণ:** ব্যবসা সম্প্রসারণ ও নারী উদ্যোক্তাদের জন্য বিশেষ স্কিম।

<div class="action-btn-group">
  <a href="https://www.sbacbank.com/emi-calculator" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-calculator"></i> লোন EMI ক্যালকুলেটর</a>
  <a href="https://www.sbacbank.com/locations" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-building"></i> নিকটস্থ শাখা</a>
</div>`;
      }
    }

    // 7. Credit & Debit Cards
    if (q.includes("কার্ড") || q.includes("card") || q.includes("credit") || q.includes("debit") || q.includes("visa") || q.includes("mastercard") || q.includes("ক্রেডিট") || q.includes("ডেবিট")) {
      if (isEn) {
        return `### 💳 SBAC Bank Credit & Debit Card Privileges

- 🌐 **Dual-Currency Worldwide Acceptance:** Global transactions via passport endorsement for shopping, international travel, and hotel bookings.
- 🕒 **Up to 45 Days Interest-Free:** Enjoy maximum flexibility on credit card purchases.
- 🏷️ **0% EMI Facilities:** Convert high-value purchases into 0% interest monthly installments across partner outlets.
- 🛡️ **EMV Chip & 3D Secure OTP:** Highest level of fraud protection and digital security.

<div class="action-btn-group">
  <a href="https://www.sbacbank.com/cards" target="_blank" class="bubble-action-btn"><i class="fa-regular fa-credit-card"></i> Card Details</a>
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> Card Support (16327)</a>
</div>`;
      } else {
        return `### 💳 SBAC ভিসা ও মাস্টারকার্ড সুবিধাসমূহ

- **ডুয়েল কারেন্সি কার্ড:** পাসপোর্ট অ্যান্ডোর্সমেন্টের মাধ্যমে দেশে ও বিদেশে অনলাইন শপিং, ভ্রমণ ও হোটেল বুকিং।
- **সুদমুক্ত সময়:** ক্রেডিট কার্ডে সর্বোচ্চ ৪৫ দিন পর্যন্ত ০% ইন্টারেস্ট পিরিয়ড।
- **০% EMI সুবিধা:** দেশসেরা আউটলেটগুলোতে ০% সুদে পণ্য কেনার সুবিধা।
- **ইএমভি চিপ ও ওটিপি:** সর্বোচ্চ পর্যায়ের আর্থিক নিরাপত্তা।

<div class="action-btn-group">
  <a href="https://www.sbacbank.com/cards" target="_blank" class="bubble-action-btn"><i class="fa-regular fa-credit-card"></i> কার্ড বিবরণ</a>
  <a href="tel:16327" class="bubble-action-btn"><i class="fa-solid fa-phone"></i> কার্ড সাপোর্ট (16327)</a>
</div>`;
      }
    }

    // 8. Banking Hours, Head Office & SWIFT
    if (q.includes("সময়") || q.includes("time") || q.includes("hour") || q.includes("schedule") || q.includes("head office") || q.includes("মতিঝিল") || q.includes("swift") || q.includes("location") || q.includes("address") || q.includes("branch")) {
      if (isEn) {
        return `### 🏛️ SBAC Bank Head Office & Banking Schedule

- **Head Office Address:** BSC Tower (5th - 16th Floor), 2-3 Rajuk Avenue, Motijheel, Dhaka-1000, Bangladesh.
- **SWIFT Code:** \`SBACBDDH\`
- **Standard Banking Hours:** Sunday to Thursday: **10:00 AM – 5:00 PM**
- **Weekly Holidays:** Friday, Saturday & Public Holidays.
- **24/7 Digital Banking:** BanglaPay App, ATMs, and Hotline **16327** operate 24 hours every day.

<div class="action-btn-group">
  <a href="https://maps.app.goo.gl/MbQ5QkHvFxvhyEoHA" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-map-pin"></i> Google Maps Location</a>
  <a href="https://www.sbacbank.com/locations" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-location-dot"></i> Find Branches</a>
</div>`;
      } else {
        return `### 🏛️ হেড অফিস ও ব্যাংকিং সময়সূচি

- **হেড অফিস:** বিএসসি টাওয়ার (৫ম-১৬তম তলা), ২-৩ রাজউক এভিনিউ, মতিঝিল, ঢাকা-১০০০।
- **SWIFT Code:** \`SBACBDDH\`
- **ব্যাংকিং সময়:** রবিবার থেকে বৃহস্পতিবার, সকাল **১০:০০ টা - বিকাল ৫:০০ টা**।
- **সাপ্তাহিক ছুটি:** শুক্রবার ও শনিবার এবং সরকারি ছুটির দিন।
- **ডিজিটাল ব্যাংকিং:** BanglaPay অ্যাপ, এটিএম বুথ এবং হেল্পলাইন **১৬৩২৭** সার্বক্ষণিক (২৪/৭) চালু থাকে।

<div class="action-btn-group">
  <a href="https://maps.app.goo.gl/MbQ5QkHvFxvhyEoHA" target="_blank" class="bubble-action-btn"><i class="fa-solid fa-map-pin"></i> গুগল ম্যাপস লোকেশন</a>
</div>`;
      }
    }

    // Default intelligent guidance
    if (isEn) {
      return `I can assist you with comprehensive information on **SBAC Bank PLC** banking services:

- 💳 **Accounts:** Savings, Current, Student (Parua), Senior Citizen, or online e-KYC accounts.
- 💰 **Deposits:** Monthly DPS, Fixed Deposit (FDR), Double & Triple growth plans.
- 🌙 **Islamic Banking:** Taqwa Shariah-compliant Mudaraba schemes.
- 📱 **Digital Banking:** BanglaPay mobile app, internet banking, bKash/Nagad fund transfer.
- 📞 **Helpline:** 24/7 Customer Care hotline at **16327**.

Please type your specific question or select from the quick options below.`;
    }

    return `আমি **SBAC Bank PLC** এর বিভিন্ন সেবা সম্পর্কে বিস্তারিত তথ্য দিতে পারি (বাংলা, English বা বাংলিশে):

- 💳 **অ্যাকাউন্ট সেবা:** সেভিংস, কারেন্ট, পড়ুয়া স্টুডেন্ট বা ই-কেওয়াইসি অ্যাকাউন্ট।
- 💰 **সঞ্চয় স্কিম:** ডিপিএস, ফিক্সড ডিপোজিট (FDR), ডাবল ও ট্রিপল বেনিফিট।
- 🌙 **ইসলামিক ব্যাংকিং:** তাকওয়া শরিয়াহ সম্মত মুদারাবা স্কিম।
- 📱 **ডিজিটাল সেবা:** BanglaPay অ্যাপ, ইন্টারনেট ব্যাংকিং, বিকাশ/নগদ ট্রান্সফার।
- 📞 **হেল্পলাইন:** ২৪ ঘণ্টা কাস্টমার কেয়ার **16327**।

অনুগ্রহ করে আপনার সুনির্দিষ্ট প্রশ্নটি লিখুন অথবা নিচের কুইক বাটনে ক্লিক করুন।`;
  }

  // --------------------------------------------------------------------------
  // Multi-Provider AI Fetchers
  // --------------------------------------------------------------------------

  // 1. OpenRouter API Fetcher (Google Gemma, Llama, Free Models)
  async function fetchOpenRouterResponse(userPrompt) {
    const isEn = detectQueryLanguage(userPrompt) === "en";
    const sysContent = isEn
      ? "You are the official AI Banking Assistant for South Bangla Agriculture and Commerce Bank PLC (SBAC Bank). Respond politely in clear, professional English with markdown formatting. Provide accurate information on SBAC products, hotline 16327, BanglaPay app, Taqwa Islamic banking, and branches."
      : "You are the official AI Banking Assistant for South Bangla Agriculture and Commerce Bank PLC (SBAC Bank). Respond politely in Bengali (or Banglish) with markdown formatting. Provide accurate information on SBAC products, hotline 16327, BanglaPay app, Taqwa Islamic banking, and branches.";

    const url = "https://openrouter.ai/api/v1/chat/completions";
    const model = openrouterModel || "google/gemma-2-9b-it:free";

    const payload = {
      model: model,
      messages: [
        { role: "system", content: sysContent },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.6
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openrouterApiKey}`,
        "HTTP-Referer": window.location.origin || "http://localhost:8000",
        "X-Title": "SBAC Bank AI Assistant"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let errMsg = `HTTP Error ${res.status}`;
      try {
        const errData = await res.json();
        if (errData && errData.error && errData.error.message) {
          errMsg = errData.error.message;
        }
      } catch (e) {}
      throw new Error(errMsg);
    }

    const data = await res.json();
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("No response returned from OpenRouter model.");
    }
    return data.choices[0].message.content;
  }

  // 2. Google Gemini API Fetcher
  async function fetchGeminiResponse(userPrompt) {
    const isEn = detectQueryLanguage(userPrompt) === "en";
    const sysPrompt = isEn 
      ? "You are the official AI Banking Assistant for South Bangla Agriculture and Commerce Bank PLC (SBAC Bank). Respond politely in clear, professional English. Provide accurate banking information about SBAC Bank products, hotline 16327, BanglaPay app, Taqwa Islamic banking, accounts, DPS, and head office Motijheel Dhaka. Keep formatting readable with markdown."
      : "You are the official AI Banking Assistant for South Bangla Agriculture and Commerce Bank PLC (SBAC Bank). Respond politely in Bengali (or Banglish), providing concise and accurate financial information regarding SBAC Bank products, hotline 16327, BanglaPay app, Taqwa Islamic banking, accounts, DPS, and head office Motijheel Dhaka. Keep formatting readable with markdown.";
    
    const model = geminiModel || (geminiModelSelect && geminiModelSelect.value) || "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
    
    const payload = {
      contents: [
        { role: "user", parts: [{ text: `${sysPrompt}\n\nUser Question: ${userPrompt}` }] }
      ]
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let errMsg = `HTTP Error ${res.status}`;
      try {
        const errData = await res.json();
        if (errData && errData.error && errData.error.message) {
          errMsg = errData.error.message;
        }
      } catch (e) {}
      throw new Error(errMsg);
    }

    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  // 3. OpenAI ChatGPT Fetcher
  async function fetchOpenAIResponse(userPrompt) {
    const isEn = detectQueryLanguage(userPrompt) === "en";
    const sysContent = isEn
      ? "You are the official AI Assistant for SBAC Bank PLC (Bangladesh). Provide accurate, helpful, and polite information in English regarding SBAC Bank products, BanglaPay app, hotline 16327, and branches."
      : "You are the official AI Assistant for SBAC Bank PLC (Bangladesh). Provide accurate, helpful, and polite information in Bengali regarding SBAC Bank products, BanglaPay app, hotline 16327, and branches.";

    const url = "https://api.openai.com/v1/chat/completions";
    const payload = {
      model: openaiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: sysContent },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.5
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let errMsg = `HTTP Error ${res.status}`;
      try {
        const errData = await res.json();
        if (errData && errData.error && errData.error.message) {
          errMsg = errData.error.message;
        }
      } catch (e) {}
      throw new Error(errMsg);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  }

  // 4. Custom API / Local Ollama Fetcher
  async function fetchCustomApiResponse(userPrompt) {
    const headers = { "Content-Type": "application/json" };
    if (customApiKey) headers["Authorization"] = `Bearer ${customApiKey}`;

    const res = await fetch(customEndpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ prompt: userPrompt, message: userPrompt })
    });

    if (!res.ok) {
      throw new Error(`Custom API returned status ${res.status}`);
    }

    const data = await res.json();
    return data.response || data.message || data.text || JSON.stringify(data);
  }

  // --------------------------------------------------------------------------
  // Sound & Speech Helpers
  // --------------------------------------------------------------------------
  function playSendSound() {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
  }

  function playReceiveSound() {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  function speakText(text) {
    if (!synth) return;
    synth.cancel();
    const cleanText = text.replace(/[*#>`_-]/g, "").trim();
    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = /[অ-হ]/.test(cleanText) ? "bn-BD" : "en-US";
    utter.rate = 1.0;
    synth.speak(utter);
  }

  function parseMarkdown(mdText) {
    if (window.marked) {
      return marked.parse(mdText);
    }
    return escapeHtml(mdText).replace(/\n/g, "<br>");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.innerText = str;
    return div.innerHTML;
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
});
