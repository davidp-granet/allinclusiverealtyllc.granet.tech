const agents = {
  "sabrina-modal": {
    name: "Sabrina Zyla",
    role: "Owner / Broker of Record",
    image: "assets/sabrina-zyla-owner.png",
    bio: [
      "Sabrina is the owner and broker of All Inclusive Realty — a boutique, mom-and-pop real estate brokerage with a wide reach. A.I.R. maintains a close-knit team while serving clients across nearly all of New England and Florida.",
      "Licensed since 2001 and a broker since 2004, Sabrina brings decades of hands-on experience. Before opening All Inclusive Realty, she ran offices for Century 21 and Exit Realty, gaining valuable leadership and market insight.",
      "Tenacious and bold when needed — but always kind, honest, and caring — Sabrina fiercely advocates for her clients while keeping their best interests at heart."
    ],
    credentials: [
      { label: "Experience", summary: "25 years in real estate" },
      { label: "Licensed States", items: ["NH", "ME", "VT", "MA", "CT", "FL"] },
      { label: "Designations", items: ["SRS", "SRES", "MRP", "ABR", "CRB", "RENE", "C2EX"] }
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
      { label: "Direct 603-553-7730", href: "tel:+16035537730" },
      { label: "Email Sabrina", href: "mailto:Sabrina@allinclusiverealtyllc.com" }
    ]
  },
  "brianna-modal": {
    name: "Brianna Zyla",
    role: "Agent / REALTOR®",
    initials: "BZ",
    bio: [
      "Brianna has been a licensed real estate agent since 2018 and has spent the past seven years helping clients navigate the exciting — and sometimes overwhelming — world of real estate. Whether buying a first home, selling a property, or exploring investment opportunities, she guides clients every step of the way.",
      "With a background in business and education in Finance, Accounting, Marketing, Economics, and Management, Brianna brings a well-rounded, strategic approach to every transaction. Her goal is to make the process smooth, informed, and enjoyable."
    ],
    credentials: [
      { label: "Experience", summary: "Licensed since 2018" },
      { label: "Services", items: ["Buying", "Selling", "Investing"] },
      { label: "Background", items: ["Marketing", "Finance"] }
    ],
    actions: [
      { label: "NH Office 603-516-7730", href: "tel:+16035167730" },
      { label: "Contact Brokerage", href: "mailto:Sabrina@allinclusiverealtyllc.com" }
    ]
  },
  "jana-modal": {
    name: "Jana A. Coughlin",
    role: "Associate Broker / REALTOR®",
    initials: "JC",
    bio: [
      "Jana A. Coughlin is a well-established real estate agent serving Southern New Hampshire, known for her dedication, experience, and unwavering commitment to customer satisfaction. She puts clients first through strong communication and exceptional people skills.",
      "A seasoned professional, Jana holds a Paralegal degree, helping clients better understand the legal aspects of buying and selling a home. Born in the Czech Republic, she studied business abroad and brings a multilingual, global perspective to her work."
    ],
    credentials: [
      { label: "Languages", items: ["Czech", "English"] },
      { label: "Designations", items: ["SRS", "SFR", "RENE", "GREEN", "ABR"] }
    ],
    actions: [
      { label: "NH Office 603-516-7730", href: "tel:+16035167730" },
      { label: "Contact Brokerage", href: "mailto:Sabrina@allinclusiverealtyllc.com" }
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

  agent.bio.forEach((paragraph) => modalContent.append(createElement("p", "", paragraph)));
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
