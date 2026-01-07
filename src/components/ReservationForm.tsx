import React, { useState, useEffect } from 'react';
import styles from './ReservationForm.module.css';
import { useTranslations } from '../utils/i18n';
import Calendar from './Calendar';

interface ReservationFormProps {
  lang: 'en' | 'hu' | 'ro';
}

const TIME_SLOTS = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

const ReservationForm: React.FC<ReservationFormProps> = ({ lang }) => {
  const t = useTranslations(lang);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    participants: 1,
    package: 'basic',
  });

  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (formData.date) {
      fetch(`/api/reservation?date=${formData.date}`)
        .then(res => res.json())
        .then(data => {
          if (data.unavailableSlots) {
            setUnavailableSlots(data.unavailableSlots);
          }
        })
        .catch(err => console.error('Failed to fetch slots', err));
    } else {
      setUnavailableSlots([]);
    }
  }, [formData.date]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = `${t('form.name')} ${t('form.error.required')}`;
    if (!formData.email) {
      newErrors.email = `${t('form.email')} ${t('form.error.required')}`;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('form.error.email');
    }
    if (!formData.phone) newErrors.phone = `${t('form.phone')} ${t('form.error.required')}`;
    if (!formData.date) newErrors.date = `${t('form.date')} ${t('form.error.required')}`;
    if (!formData.time) newErrors.time = `${t('form.time')} ${t('form.error.required')}`;
    
    if (formData.participants < 1) {
      newErrors.participants = t('form.error.participants');
    } else if (formData.participants > 10) {
      newErrors.participants = t('form.error.participants.max');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('/api/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.message || 'Something went wrong' });
        }
      } catch (error) {
        setErrors({ submit: 'Failed to connect to the server' });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value) : value,
    }));
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date, time: '' })); // Clear time when date changes
  };

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        <h2>{t('form.success.title')}</h2>
        <p>{t('form.success.message')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.reservationForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name">{t('form.name')}</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">{t('form.email')}</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">{t('form.phone')}</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>{t('form.date')}</label>
        <Calendar 
          selectedDate={formData.date} 
          onDateSelect={handleDateSelect} 
          lang={lang}
        />
        {errors.date && <span className={styles.error}>{errors.date}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="time">{t('form.time')}</label>
        <select id="time" name="time" value={formData.time} onChange={handleChange} disabled={!formData.date}>
          <option value="">-- {t('form.time')} --</option>
          {TIME_SLOTS.map(slot => (
            !unavailableSlots.includes(slot) && (
              <option key={slot} value={slot}>{slot}</option>
            )
          ))}
        </select>
        {errors.time && <span className={styles.error}>{errors.time}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="participants">{t('form.participants')}</label>
        <input 
          type="number" 
          id="participants" 
          name="participants" 
          min="1" 
          max="10" 
          value={formData.participants} 
          onChange={handleChange} 
        />
        {errors.participants && <span className={styles.error}>{errors.participants}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="package">{t('form.package')}</label>
        <select id="package" name="package" value={formData.package} onChange={handleChange}>
          <option value="basic">{t('form.package.basic')}</option>
          <option value="birthday">{t('form.package.birthday')}</option>
          <option value="corporate">{t('form.package.corporate')}</option>
        </select>
      </div>

      <button type="submit" className={styles.submitBtn}>{t('form.submit')}</button>
      {errors.submit && <p className={styles.error} style={{ textAlign: 'center', marginTop: '1rem' }}>{errors.submit}</p>}
    </form>
  );
};

export default ReservationForm;
