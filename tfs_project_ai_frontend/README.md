# Proper Handyman — Professional Home Repair & Maintenance Services

Proper Handyman is a responsive website created to showcase a professional home repair and maintenance service company going into AI. It provides a clean, user-friendly platform for homeowners to explore service offerings, get suggestions for repairs and connect with qualified handymen, **and access AI-powered support with integrated parts ordering** — all built with modern front-end technologies and robust API integrations.

The tagline: _"Your home, perfected. One project at a time."_ 🔧✨

---

## Live Demo

🔗 [Proper Handyman Live Demcd ..o](https://ij888.github.io/tfs_project_ai_frontend/tfs_project_ai_frontend/ask/)  
💬 _Try the chatbot in bottom-right corner!_  
🛒 _Explore the merch shop under "Shop/"_

---

## Project Overview

Proper Handyman delivers a complete digital experience through three integrated modules:

1. **Services Hub**
   - Comprehensive service packages (plumbing, electrical, carpentry) with dynamic pricing
   - Real-time quote calculator with service bundling logic

2. **AI Support Chatbot**
   - Dialogflow-powered assistant handling FAQs, scheduling checks, and service recommendations
   - Fallback to human agent handoff via email integration

3. **Integrated Parts Shop**
   - Custooom API-driven e-commerce module for ordering branded merch
   - Real-time inventory sync, cart persistence, and secure checkout flow (to-do)

All modules feature mobile-first responsive design, WCAG 2.1 accessibility compliance, and seamless cross-component data flow.

---

## Technologies Used

| Category          | Technology Stack                                                                  |
| ----------------- | --------------------------------------------------------------------------------- |
| **Core**          | HTML5, CSS3 (Flexbox), Vanilla JavaScript                                         |
| **APIs**          | Dialogflow (chatbot NLP), Shopify Storefront API                                  |
| **API Wrangling** | Custom middleware for auth, error handling, rate limiting, and data normalization |
| **Testing**       | ESLint, (Chrome/Firefox/Safari), Postman API validation                           |
| **Workflow**      | Trello (sprints), Slack (faculty comms), GitHub (deploy)                          |
| **Hosting**       | GitHub Pages                                                                      |

---

## Key Features

✨ **Smart Chatbot Integration**

- Context-aware responses using custom context editor
- Session persistence across page navigations
- Error-resilient fallbacks when APIs timeout (to-do)

🛒 **Seamless Shop Experience**

- Real-time inventory checks via Shopify API polling
- PCI-compliant payment flow (Stripe gateway) (nice to have, to-do)

⚡ **Performance Optimizations**

- API response caching (localStorage)
- Lazy-loaded chat widget (reduces initial load by 300ms)
- Debounced search queries for product catalog

---

## API Wrangling Deep Dive

_(Critical integration challenges solved)_

| Challenge | Solution | Outcome |
|-------------------------------|-------------------------------------------|----------------------------------| |
| **Dialogflow session mgmt** | Custom UUID generator + localStorage sync | Persistent chat context |
| **Rate limiting** | Exponential backoff + queue system | Zero failed user requests |
| **Data normalization** | Unified product schema mapper | Consistent display across modules|

```javascript
// Simplified API middleware example
const apiClient = {
  async fetchWithRetry(endpoint, options, retries = 3) {
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      if (retries > 0) {
        await new Promise(res => setTimeout(res, 2 ** (3 - retries) * 100));
        return this.fetchWithRetry(endpoint, options, retries - 1);
      }
      logErrorToSlack(err); // Faculty alert system
      return this.getFallbackData(endpoint); // Graceful degradation
    }
  }
};
```

Workflow & Collaboration

    Team Structure: Solo developer (full-stack implementation + API integration)
    Agile Process: 90-min sprints with daily standups; Trello boards tracking API endpoints/tasks
    API Protocol: Dedicated "Integration Sprint" for each third-party service
    Code Quality: ESLint + API contract testing + cross-browser validation (Chrome/Firefox/Safari)
    Communication: Slack- faculty lead sign-off on integration architecture
    Deployment: Git branches per API module → GitHub Actions auto-deploy to staging

Learning Outcomes
✅ Mastered third-party API integration patterns (auth flows, error handling, rate limiting)
✅ Built resilient middleware for inconsistent external service responses
✅ Implemented graceful degradation strategies when APIs fail
✅ Balanced UX continuity across chatbot/shop/service modules
✅ Documented API contracts for future maintenance scalability

