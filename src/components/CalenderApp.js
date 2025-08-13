import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarApp() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [isEditingYear, setIsEditingYear] = useState(false);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYear(parseInt(e.target.value || year));

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevYear = () => setYear(year - 1);
  const nextYear = () => setYear(year + 1);

  // Generate calendar days
  const generateCalendar = () => {
    const weeks = [];
    let days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(<td key={d}>{d}</td>);
      if ((days.length) % 7 === 0) {
        weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
        days = [];
      }
    }
    if (days.length) {
      while (days.length < 7) days.push(<td key={`empty-end-${days.length}`}></td>);
      weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
    }
    return weeks;
  };

  return (
    <div>
      <h1 id="calendar-heading" style={{ color: "deepskyblue" }}>Calendar</h1>

      <select id="month-dropdown" value={month} onChange={handleMonthChange}>
        {months.map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))}
      </select>

      {isEditingYear ? (
        <input
          id="year-input"
          type="number"
          value={year}
          onChange={handleYearChange}
          onBlur={() => setIsEditingYear(false)}
          autoFocus
        />
      ) : (
        <span
          id="year-display"
          onDoubleClick={() => setIsEditingYear(true)}
          style={{ marginLeft: "5px", cursor: "pointer" }}
        >
          {year}
        </span>
      )}

      <hr />

      <table id="days-table" border="0">
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th>
            <th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>

      <hr />

      <div>
        <button id="prev-year-btn" onClick={prevYear}>&lt;&lt;</button>
        <button id="prev-month-btn" onClick={prevMonth}>&lt;</button>
        <button id="next-month-btn" onClick={nextMonth}>&gt;</button>
        <button id="next-year-btn" onClick={nextYear}>&gt;&gt;</button>
      </div>
    </div>
  );
}
