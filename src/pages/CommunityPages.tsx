import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero, Container, Button } from "../components/ui";
import { faqs, facebookReviews, galleryGroups, pastMembers, reviews, services, teamMembers } from "../data/secondary";
import { links } from "../data/site";

export function TeamPage() {
  const leaders = teamMembers.filter(person => person.tier === "Leadership");
  const advisor = teamMembers.find(person => person.tier === "Advisor")!;
  const departmentLeads = teamMembers.filter(person => person.tier === "Department Lead");
  const coreMembers = teamMembers.filter(person => person.tier === "Core Member");
  return <>
    <PageHero eyebrow="Sociapi Society / National Team" title="The people behind the network." text="A student-led national team working across leadership, operations, events, outreach, media, and design." />
    <section className="team-editorial">
      <Container>
        <div className="team-context">
          <p>SOCIAPI SOCIETY / NATIONAL TEAM</p>
          <strong>11</strong>
          <span>core team members across people, events, media, outreach, design, and operations.</span>
        </div>
        <header className="team-section-head"><span>01 / LEADERSHIP</span><h2>One leadership team.</h2><p>Founder, Co-Founder, and General Secretary working through one shared structure.</p></header>
        <div className="leadership-roster">
          {leaders.map(person => <article key={person.name}>
            <div className="team-portrait"><img src={person.image} alt={person.name} /></div>
            <div>
              <span>{person.role}</span>
              <h2>{person.name}</h2>
              <p>{person.bio}</p>
            </div>
          </article>)}
        </div>
        <section className="advisor-roster">
          <header><span>02 / ADVISOR</span><h2>Academic guidance.</h2></header>
          <article><div className="team-portrait"><img src={advisor.image} alt={advisor.name} /></div><div><span>{advisor.role}</span><h3>{advisor.name}</h3><p>{advisor.bio}</p></div></article>
        </section>
        <section className="department-section">
          <header className="team-section-head"><span>03 / DEPARTMENT LEADS</span><h2>National team leads.</h2><p>People responsible for the systems and disciplines that keep Sociapi moving.</p></header>
          <div className="department-roster">{departmentLeads.map((person, index) => <article key={person.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className="roster-portrait"><img src={person.image} alt={person.name} /></div>
            <p>{person.department}</p><div><h3>{person.name}</h3><p>{person.role}</p></div>
          </article>)}</div>
        </section>
        <section className="core-section">
          <header className="team-section-head"><span>04 / CORE MEMBERS</span><h2>The wider working team.</h2><p>Members supporting communication, media, event experience, outreach, and operations.</p></header>
          <div className="core-roster">{coreMembers.map(person => <article key={person.name}>
            <div className="roster-portrait"><img src={person.image} alt={person.name} /></div>
            <div><span>{person.department}</span><h3>{person.name}</h3><p>{person.role}</p></div>
          </article>)}</div>
        </section>
        <aside className="chapter-team-note">
          <p>CHAPTER LEADERSHIP</p><h2>Campus teams are listed with their chapters.</h2><Link to="/chapters">Explore chapter leadership ↗</Link>
        </aside>
        <details className="contributors-archive">
          <summary><span>05 / PAST CONTRIBUTORS</span><strong>{pastMembers.length}</strong><b>Open archive</b></summary>
          <div><p>Former team members whose work contributed to Sociapi's growth.</p><div>{pastMembers.map(member => {
            const [name, role] = member.split(" — ");
            return <article key={member}><strong>{name}</strong><span>{role}</span></article>;
          })}</div></div>
        </details>
      </Container>
    </section>
  </>;
}

export function GalleryPage() {
  const all = useMemo(() => galleryGroups.flatMap(group => group.images.map(src => ({ src, group: group.name }))), []);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % all.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + all.length) % all.length);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [active, all.length]);
  return <>
    <PageHero eyebrow="Gallery" title="Inside Sociapi." text="The rooms, stages, conversations, and people behind the community." />
    <section className="gallery-page"><Container>
      {galleryGroups.map(group => <div className="gallery-chapter" key={group.name}>
        <header><h2>{group.name}</h2><span>{String(group.images.length).padStart(2, "0")} moments</span></header>
        <div className="editorial-gallery">
          {group.images.map((src, index) => {
            const global = all.findIndex(item => item.src === src);
            return <button key={src} className={`gallery-tile tile-${index % 7}`} onClick={() => setActive(global)}>
              <img src={src} alt={`${group.name} moment ${index + 1}`} loading="lazy" /><span>Open image ↗</span>
            </button>;
          })}
        </div>
      </div>)}
    </Container></section>
    {active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={() => setActive(null)}>
      <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery">×</button>
      <button className="lightbox-prev" onClick={event => { event.stopPropagation(); setActive((active - 1 + all.length) % all.length); }} aria-label="Previous image">←</button>
      <figure onClick={event => event.stopPropagation()}><img src={all[active].src} alt={`${all[active].group} enlarged`} /><figcaption>{all[active].group} · {active + 1}/{all.length}</figcaption></figure>
      <button className="lightbox-next" onClick={event => { event.stopPropagation(); setActive((active + 1) % all.length); }} aria-label="Next image">→</button>
    </div>}
  </>;
}

export function ReviewsPage() {
  return <>
    <PageHero eyebrow="Community feedback" title="What people say about Sociapi." text="Real course feedback and Facebook recommendations shared by members of the community." />
    <section className="reviews-page"><Container>
      <div className="reviews-intro"><p className="section-label">In their words</p><h2>Learning that people remember.</h2><p>These reviews are shown with the names and source details supplied to Sociapi.</p></div>
      <div className="review-wall">
        {reviews.map((review, index) => <blockquote key={review.author} className={index === 2 ? "review-featured" : ""}>
          <span>“</span><p>{review.text}</p><footer><strong>{review.author}</strong><small>{review.source}</small></footer>
        </blockquote>)}
      </div>
      <a className="share-review" href={facebookReviews} target="_blank" rel="noreferrer">Share your experience on Facebook <span>↗</span></a>
    </Container></section>
  </>;
}

export function FAQPage() {
  const groups = [...new Set(faqs.map(item => item.group))];
  return <><PageHero eyebrow="Questions" title="Clear answers, quickly." text="Membership, chapters, programs, certificates, partnerships, and the shop." />
    <section className="faq-page"><Container>
      <nav aria-label="FAQ categories">{groups.map(group => <a key={group} href={`#${group.replace(/\W+/g, "-").toLowerCase()}`}>{group}</a>)}</nav>
      <div>{groups.map(group => <section key={group} id={group.replace(/\W+/g, "-").toLowerCase()}><p className="section-label">{group}</p>{faqs.filter(item => item.group === group).map(item => <details key={item.q}><summary>{item.q}<span>+</span></summary><p>{item.a}</p></details>)}</section>)}</div>
    </Container></section>
  </>;
}

export function ServicesPage() {
  return <><PageHero eyebrow="Sociapi Labs / Services" title="Work made by the creative side of Sociapi." text="A secondary initiative offering selected digital and creative services. Sociapi Society remains, first and foremost, a student technology community." image="/Image/Agentum Pic/IMG_5998.png" />
    <section className="services-page"><Container>
      <div className="labs-note"><span>SOCIAPI SOCIETY</span><i>COMMUNITY</i><b>+</b><span>SOCIAPI LABS</span><i>CREATIVE SERVICES</i></div>
      {services.map((service, index) => <article key={service.name}><span>0{index + 1}</span><h2>{service.name}</h2><p>{service.text}</p><a href={`https://wa.me/923329984490?text=${encodeURIComponent(`Hello Sociapi, I am interested in ${service.name}.`)}`} target="_blank" rel="noreferrer">Discuss a project ↗</a></article>)}
    </Container></section>
  </>;
}

export function ContactPage() {
  const routes = [["General inquiry", "sociapisociety@gmail.com", "mailto:sociapisociety@gmail.com"], ["Partnerships", "Work with the chapter network", "/partner-with-us"], ["Chapters / Campus Lead", "Start or join a chapter", links.chapter], ["Events", "Speak, attend, or collaborate", "mailto:sociapisociety@gmail.com?subject=Events inquiry"], ["WhatsApp", "+92 332 9984490", "https://wa.me/923329984490"]];
  return <><PageHero eyebrow="Contact" title="Start with the right conversation." text="Choose a direct route or send the team a message. No ticket system, no fake chat bot." />
    <section className="contact-page"><Container>
      <div className="contact-routes">{routes.map((route, index) => <a key={route[0]} href={route[2]}><span>0{index + 1}</span><h3>{route[0]}</h3><p>{route[1]}</p><b>↗</b></a>)}</div>
      <div className="contact-split">
        <form action="https://formsubmit.co/sociapisociety@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="Contact inquiry from Sociapi website" />
          <label>Name<input required name="name" autoComplete="name" /></label><label>Email<input required type="email" name="email" autoComplete="email" /></label>
          <label>Phone<input name="phone" autoComplete="tel" /></label><label>Topic<select name="type"><option>General inquiry</option><option>Campus chapter</option><option>Events</option><option>Technical support</option><option>Services</option></select></label>
          <label className="full">Message<textarea required name="message" /></label><button className="button">Send message</button><p>Submissions are handled by FormSubmit and delivered to the Sociapi email address.</p>
        </form>
        <div className="contact-place"><iframe title="Islamia College University Peshawar map" loading="lazy" src="https://www.google.com/maps?q=Islamia%20College%20University%20Peshawar%20Pakistan&output=embed" /><h3>Islamia College University</h3><p>Peshawar, Pakistan</p><div><a href={links.instagram}>Instagram</a><a href={links.linkedin}>LinkedIn</a><a href={links.facebook}>Facebook</a></div></div>
      </div>
    </Container></section>
  </>;
}

export function HomeTeasers() {
  return <><section className="home-gallery-teaser"><div><p>INSIDE SOCIAPI</p><h2>Not stock photos.<br />Real rooms. Real students.</h2><Link to="/gallery">Open the gallery ↗</Link></div><img src="/Image/Agentum Pic/12.png" alt="Sociapi event moment" /><img src="/Image/Agentum Pic/14.png" alt="Sociapi community moment" /><img src="/Image/3.png" alt="MEHFIL AI moment" /></section>
    <section className="home-reviews"><p>COMMUNITY FEEDBACK</p><div>{reviews.slice(0, 3).map(review => <blockquote key={review.author}><p>“{review.excerpt}”</p><footer>{review.author}</footer></blockquote>)}</div><Link to="/reviews">Read all feedback ↗</Link></section>
  </>;
}

export function ChapterCTA() {
  return <section className="chapter-final"><img src="/Image/Agentum Pic/IMG_5921.png" alt="Sociapi community together" /><div /><p>YOUR CAMPUS COULD BE NEXT.</p><h2>THE NEXT CHAPTER<br />STARTS WITH STUDENTS.</h2><nav><Button to={links.chapter} external>Start a Chapter ↗</Button><Button to={links.join} external secondary>Join a Chapter ↗</Button></nav></section>;
}
