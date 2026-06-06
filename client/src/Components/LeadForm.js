import { useState } from 'react';
import toast from 'react-hot-toast';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

const EMPTY = { name: '', email: '', phone: '', company: '', status: 'New', notes: '' };

export default function LeadForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10-digit phone required';
    if (!form.company.trim()) e.company = 'Company is required';
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await onSave(form);
      toast.success(initial ? 'Lead updated!' : 'Lead created!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const field = (label, key, type = 'text', placeholder = '') => (
    <div className="field">
      <label>{label}</label>
      <input type={type} value={form[key]} onChange={set(key)} placeholder={placeholder} className={errors[key] ? 'error' : ''} />
      {errors[key] && <span className="error-msg">{errors[key]}</span>}
    </div>
  );

  return (
    <form onSubmit={submit} className="lead-form">
      <h2>{initial ? 'Edit Lead' : 'Add New Lead'}</h2>
      {field('Full Name *', 'name', 'text', 'e.g. Priya Sharma')}
      {field('Email *', 'email', 'email', 'priya@company.com')}
      {field('Phone *', 'phone', 'tel', '10-digit number')}
      {field('Company *', 'company', 'text', 'Company name')}
      <div className="field">
        <label>Status</label>
        <select value={form.status} onChange={set('status')}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Notes</label>
        <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Additional notes..." />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Lead'}
        </button>
      </div>
    </form>
  );
}
