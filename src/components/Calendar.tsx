import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  lang: 'en' | 'hu' | 'ro';
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, lang }) => {
  const [viewDate, setViewDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<Record<string, number>>({});

  useEffect(() => {
    setViewDate(new Date());
  }, []);

  const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    hu: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
    ro: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
  };

  const dayNames = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    hu: ['Vas', 'Hét', 'Ked', 'Sze', 'Csü', 'Pén', 'Szo'],
    ro: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm']
  };

  const safeLang = (monthNames[lang] ? lang : 'en') as 'en' | 'hu' | 'ro';

  useEffect(() => {
    if (!viewDate) return;

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth() + 1;
    const monthStr = month.toString().padStart(2, '0');
    
    fetch(`/api/availability?year=${year}&month=${monthStr}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (data && data.availability) {
          setAvailability(data.availability);
        }
      })
      .catch(err => {
        console.error('Failed to fetch availability', err);
        setAvailability({});
      });
  }, [viewDate]);

  if (!viewDate) return <div style={{ minHeight: '300px' }}>Loading calendar...</div>;

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (!viewDate) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    if (!viewDate) return;
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const isWorkingDay = (date: Date) => {
    if (!date) return false;
    const day = date.getDay();
    // Default: 0 = Sunday, 6 = Saturday (Weekends are non-working per spec)
    if (day === 0 || day === 6) return false;
    
    // Check for public holidays (simplified for now)
    const month = date.getMonth() + 1;
    const d = date.getDate();
    const md = `${month}-${d}`;
    const holidays = ['1-1', '1-2', '3-15', '5-1', '12-1', '12-25', '12-26']; // RO/HU combined basics
    if (holidays.includes(md)) return false;

    return true;
  };

  const renderDays = () => {
    const days = [];
    const numDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.dayEmpty}></div>);
    }

    for (let d = 1; d <= numDays; d++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const working = isWorkingDay(date);
      const bookingCount = availability[dateStr] || 0;
      const isFull = bookingCount >= 6;
      const isSelected = selectedDate === dateStr;
      const isPast = date < new Date(new Date().setHours(0,0,0,0));

      days.push(
        <div 
          key={d} 
          className={`${styles.day} ${!working || isFull || isPast ? styles.disabled : ''} ${isSelected ? styles.selected : ''}`}
          onClick={() => working && !isFull && !isPast && onDateSelect(dateStr)}
        >
          <span className={styles.dayNumber}>{d}</span>
          <div className={styles.dots}>
            {working && !isPast && Array.from({ length: 6 - bookingCount }).map((_, idx) => (
              <span key={idx} className={styles.dot}>.</span>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button type="button" onClick={handlePrevMonth}>&lt;</button>
        <span>{monthNames[safeLang][viewDate.getMonth()]} {viewDate.getFullYear()}</span>
        <button type="button" onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className={styles.weekDays}>
        {dayNames[safeLang].map(day => <div key={day}>{day}</div>)}
      </div>
      <div className={styles.daysGrid}>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
