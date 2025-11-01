document.addEventListener('DOMContentLoaded', () => {
  const courses = [
    { code: "WDD130", title: "Introduction to Web", subject: "WDD", credits: 3, completed: true },
    { code: "WDD131", title: "HTML & CSS", subject: "WDD", credits: 3, completed: true },
    { code: "WDD231", title: "Web Frontend Dev I", subject: "WDD", credits: 3, completed: false },
    { code: "CSE110", title: "Programming Fundamentals", subject: "CSE", credits: 3, completed: true },
    { code: "CSE121", title: "Programming II", subject: "CSE", credits: 3, completed: false }
  ];

  const listEl = document.getElementById('course-list');
  const totalValueEl = document.getElementById('total-credits-value');

  const btnAll = document.getElementById('all');
  const btnCse = document.getElementById('cse');
  const btnWdd = document.getElementById('wdd');

  function render(arr) {
    if (!listEl) return;
    listEl.innerHTML = '';

    arr.forEach(c => {
      const card = document.createElement('article');
      card.className = 'course-card';
      if (c.completed) card.classList.add('completed');

      card.innerHTML = `
        <h3>${c.code} — ${c.title}</h3>
        <p>${c.credits} credits • ${c.subject}</p>
      `;
      listEl.appendChild(card);
    });

    const totalCompleted = arr
      .filter(x => x.completed)
      .reduce((sum, x) => sum + x.credits, 0);

    if (totalValueEl) totalValueEl.textContent = totalCompleted;
  }

  function setActive(btn) {
    [btnAll, btnCse, btnWdd].forEach(b => b?.classList.remove('active'));
    btn?.classList.add('active');
  }
  btnAll?.addEventListener('click', () => {
    render(courses);
    setActive(btnAll);
  });

  btnCse?.addEventListener('click', () => {
    render(courses.filter(x => x.subject === 'CSE'));
    setActive(btnCse);
  });

  btnWdd?.addEventListener('click', () => {
    render(courses.filter(x => x.subject === 'WDD'));
    setActive(btnWdd);
  });

  render(courses);
  setActive(btnAll);
});
