import { useState, useEffect, useCallback } from 'react';
import { getLeads, deleteLead, updateLead, createLead } from '../services/api';
import LeadForm from '../Components/LeadForm';
import Modal from '../Components/Modal';
import StatusBadge from '../Components/StatusBlade';
import toast from 'react-hot-toast';

const STATUSES = ['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
const SORT_OPTIONS = [
  { label: 'Newest First', sortBy: 'createdAt', order: 'desc' },
  { label: 'Oldest First', sortBy: 'createdAt', order: 'asc' },
  { label: 'Name A-Z', sortBy: 'name', order: 'asc' },
  { label: 'Name Z-A', sortBy: 'name', order: 'desc' },
  { label: 'Company A-Z', sortBy: 'company', order: 'asc' },
];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState(0);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);
  const [expanded, setExpanded] = useState(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search: debouncedSearch || undefined,
        status: status !== 'All' ? status : undefined,
        sortBy: SORT_OPTIONS[sort].sortBy,
        order: SORT_OPTIONS[sort].order,
        page,
        limit: 8,
      };
      const res = await getLeads(params);
      setLeads(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, sort, page]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await deleteLead(id);
      toast.success('Lead deleted');
      fetchLeads();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus });
      toast.success('Status updated');
      fetchLeads();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const onSave = async (form) => {
    try {
      if (modal === 'add') await createLead(form);
      else await updateLead(modal._id, form);
      toast.success(modal === 'add' ? 'Lead created!' : 'Lead updated!');
      setModal(null);
      fetchLeads();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
      throw err;
    }
  };

  if (error) return <div className="error-state">⚠️ {error}</div>;

  return (
    <div className="leads-page">
      {/* Toolbar */}
      <div className="toolbar">
        <input
          className="search-input"
          placeholder="🔍 Search by name, email, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="filter-select">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={sort} onChange={(e) => { setSort(Number(e.target.value)); setPage(1); }} className="filter-select">
          {SORT_OPTIONS.map((o, i) => <option key={i} value={i}>{o.label}</option>)}
        </select>
        <button className="btn-primary" onClick={() => setModal('add')}>+ Add Lead</button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading">Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 48 }}>📋</div>
          <p>No leads found. Try a different search or add a new lead.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="leads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <>
                  <tr key={lead._id} className="lead-row" onClick={() => setExpanded(expanded === lead._id ? null : lead._id)}>
                    <td>
                      <div className="lead-name">{lead.name}</div>
                      <div className="lead-email">{lead.email}</div>
                    </td>
                    <td>{lead.company}</td>
                    <td>{lead.phone}</td>
                    <td><StatusBadge status={lead.status} /></td>
                    <td>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="action-btns">
                        <button className="btn-edit" onClick={() => setModal(lead)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDelete(lead._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                  {expanded === lead._id && (
                    <tr key={`${lead._id}-exp`} className="expanded-row">
                      <td colSpan={6}>
                        <div className="expanded-content">
                          <div><strong>Notes:</strong> {lead.notes || '—'}</div>
                          <div className="status-change">
                            <strong>Change Status:</strong>
                            {['New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((s) => (
                              <button
                                key={s}
                                className={`status-btn ${lead.status === s ? 'active' : ''}`}
                                onClick={() => handleStatusChange(lead._id, s)}
                              >{s}</button>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <span className="page-info">
            Showing {(page - 1) * 8 + 1}–{Math.min(page * 8, pagination.total)} of {pagination.total}
          </span>
          <div className="page-btns">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="page-btn">← Prev</button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`page-btn ${p === page ? 'active' : ''}`}>{p}</button>
            ))}
            <button disabled={page === pagination.totalPages} onClick={() => setPage(p => p + 1)} className="page-btn">Next →</button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <Modal onClose={() => setModal(null)}>
          <LeadForm initial={modal === 'add' ? null : modal} onSave={onSave} onCancel={() => setModal(null)} />
        </Modal>
      )}
    </div>
  );
}
