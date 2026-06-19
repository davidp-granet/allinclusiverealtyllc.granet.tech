const agents = {
  "sabrina-modal": {
    name: "Sabrina Zyla",
    role: "Owner / Broker of Record",
    image: "assets/sabrina-zyla-owner.png",
    bio: `
      <p>Sabrina is the owner and broker of All Inclusive Realty — a boutique, mom-and-pop real estate brokerage with a wide reach. A.I.R. maintains a close-knit team while serving clients across nearly all of New England and Florida.</p>
      <p>Licensed since 2001 and a broker since 2004, Sabrina brings decades of hands-on experience. Before opening All Inclusive Realty, she ran offices for Century 21 and Exit Realty, gaining valuable leadership and market insight.</p>
      <p>Tenacious and bold when needed — but always kind, honest, and caring — Sabrina fiercely advocates for her clients while keeping their best interests at heart.</p>
      <p><b>Home is where the heart is, and we are the company with heart.</b></p>
    `,
    credentials: [
      { label: "Experience", summary: "25 years in real estate" },
      { label: "Licensed States", items: ["NH", "ME", "VT", "MA", "CT", "FL"] },
      { label: "Designations", items: ["SRS", "SRES", "RENE", "MRP", "ABR", "CRB", "C2EX"] }
    ],
    licenses: [
      "NH Broker #053461",
      "MA Broker #9551541",
      "VT Broker #081.0134172",
      "ME Broker #DB925821",
      "CT Broker #REB.0795398",
      "FL Broker #BK3622634"
    ],
    actions: [
      { label: "Call 603-553-7730", href: "tel:+16035537730" },
      { label: "Email Sabrina", href: "mailto:sabrina@allinclusiverealtyllc.com" }
    ]
  },
  "brianna-modal": {
    name: "Brianna Zyla",
    role: "Agent / REALTOR®",
    image: "assets/brianna-zyla-cropped.jpg",
    bio: `
      <p>Hi there! I’ve been a licensed real estate agent since 2018 and have spent the past seven years helping clients navigate the exciting (and sometimes overwhelming) world of real estate. Whether you're buying your first home, selling a property, or looking for investment opportunities, I’m here to guide you every step of the way.</p>
      <p>With a background in business and education in Finance, Accounting, Marketing, Economics, and Management, I bring a well - rounded, strategic approach to each transaction. My goal is to make the process smooth, informed, and—believe it or not—enjoyable!</p>
      <p>Over the years, I’ve built a strong track record by staying proactive, responsive, and committed to my clients’ success. I pride myself on clear communication, expert guidance, and a genuine passion for helping people achieve their real estate goals.</p>
      <p>Ready to get started? I’m here to answer your questions and guide you through every step. Let's connect and discuss how I can help you achieve your real estate goals.</p>
      <p>Follow me on social media and check out my Zillow profile linked below to stay up to date with my latest listings and real estate updates!</p>
    `,
    credentials: [
      { label: "Experience", summary: "Licensed since 2018" },
      { label: "Designations", items: ["RENE", "RSPS", "AWD"] }
    ],
    actions: [
      { label: "Call 603-339-4799", href: "tel:+16033394799" },
      { label: "Email Brianna", href: "mailto:brianna@allinclusiverealtyllc.com" }
    ],
    links: [
      { label: "Facebook", href: "https://www.facebook.com/Briannazylarealtor" },
      { label: "Instagram", href: "https://www.instagram.com/zyla_realestate/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/brianna-zyla-rene-rsps-84639214a" },
      { label: "Zillow", href: "https://www.zillow.com/profile/bzylarealtor" },
    ]
  },
  "jana-modal": {
    name: "Jana A. Coughlin",
    role: "Associate Broker / REALTOR®",
    image: 'assets/jana-coughlin-cropped.jpg',
    bio: `
      <p><b>Jana A. Coughlin</b> is a well - established real estate agent serving Southern New Hampshire, known for her dedication, experience, and unwavering commitment to customer satisfaction. She puts clients first by combining strong communication and exceptional people skills, guided by her motto: <i>“Communication is #1—always going above and beyond.”</i></p>
      <p>A seasoned professional, Jana holds a Paralegal degree, which allows her to help clients better understand the legal aspects of buying and selling a home. Born in the Czech Republic, she studied business abroad and brings a multilingual, global perspective to her work—an invaluable asset to her clients.</p>
      <p>Jana’s drive and expertise are further strengthened by multiple professional certifications, including <b>RENE</b> (Real Estate Negotiation Expert), <b>SRS</b> (Seller Representative Specialist), <b>SFR</b> (Short Sale and Foreclosure Representative), <b>ABR</b> (Accredited Buyer’s Representative), and <b>GREEN</b> (specializing in energy efficiency and sustainable home practices).</p>
    `,
    credentials: [
      { label: "Languages", items: ["Czech", "English"] },
      { label: "Designations", items: ["RENE", "SRS", "SFR", "ABR", "GREEN"] }
    ],
    actions: [
      { label: "Call 603-566-0112", href: "tel:+16035660112" },
      { label: "Email Jana", href: "mailto:jana@allinclusiverealtyllc.com" }
    ]
  }
};

const modal = document.querySelector("#agent-modal");
const modalHead = document.querySelector("#agent-modal-head");
const modalContent = document.querySelector("#agent-modal-content");

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderAvatar(agent) {
  if (agent.image) {
    const image = createElement("img", "agent-avatar large");
    image.src = agent.image;
    image.alt = agent.name;
    return image;
  }

  const initials = createElement("div", "agent-avatar large", agent.initials);
  initials.setAttribute("aria-hidden", "true");
  return initials;
}

function renderCredentials(agent) {
  const groups = createElement("div", "credential-groups");
  groups.setAttribute("aria-label", `${agent.name} credentials`);

  agent.credentials.forEach((credential) => {
    const group = createElement("div", "credential-group");
    group.append(createElement("strong", "", credential.label));

    if (credential.summary) {
      group.append(createElement("span", "credential-summary", credential.summary));
    } else {
      const items = createElement("div", "credential-items");
      credential.items.forEach((item) => items.append(createElement("span", "", item)));
      group.append(items);
    }

    groups.append(group);
  });

  return groups;
}

function renderLicenses(agent) {
  if (!agent.licenses) return null;

  const licenses = createElement("div", "license-list bio-license-list");
  licenses.setAttribute("aria-label", `${agent.name} broker licenses`);
  licenses.append(createElement("strong", "", "Broker Licenses"));
  agent.licenses.forEach((license) => licenses.append(createElement("span", "", license)));
  return licenses;
}

function renderActions(agent) {
  const actions = createElement("div", "contact-strip");
  agent.actions.forEach((action) => {
    const link = createElement("a", "", action.label);
    link.href = action.href;
    actions.append(link);
  });
  return actions;
}

function renderModal() {
  const hash = window.location.hash.slice(1);
  const agent = agents[hash];

  if (!agent) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    return;
  }

  modalHead.replaceChildren();
  modalContent.replaceChildren();

  const identity = createElement("div");
  identity.append(
    createElement("h2", "", agent.name),
    createElement("p", "", agent.role)
  );
  identity.querySelector("h2").id = "agent-modal-title";
  modalHead.append(renderAvatar(agent), identity);

  modalContent.innerHTML += agent.bio;

  const linksContainer = createElement("p", 'agent-modal-links');
  (agent.links ?? []).forEach((link) => {
    linksContainer.innerHTML += `<a href=${link.href} target="_blank" rel="noopener noreferrer">${link.label}</a><br>`;
  });
  if (agent.links) { modalContent.append(linksContainer); }

  modalContent.append(renderCredentials(agent));

  const licenses = renderLicenses(agent);
  if (licenses) modalContent.append(licenses);

  modalContent.append(renderActions(agent));
  modal.setAttribute("aria-label", `${agent.name} details`);
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
  modal.querySelector(".close").focus();
}

window.addEventListener("hashchange", renderModal);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    window.location.hash = "team";
  }
});
modal.addEventListener("click", (event) => {
  if (event.target === modal) window.location.hash = "team";
});

renderModal();
