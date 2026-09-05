import { Edit3, Plus, Search, ShieldCheck, Trash2, UserCog, UserX, X } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyState, PageHeading, SearchField, StatusBadge, buttonPrimary, buttonSecondary, inputClass } from "@/components/admin/AdminUi";
import { useAdmin } from "@/context/AdminContext";

const emptyStaff = { id: "", name: "", email: "", password: "", roleId: "", status: "Active" };

export default function AdminTeamPage() {
  const { staff, roles, session, saveStaff, deleteStaff, toggleStaffStatus } = useAdmin();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");
  const currentUserId = session?.userId;

  const filtered = useMemo(() => staff.filter((user) => {
    const matchesQuery = `${user.name} ${user.email}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (roleFilter === "All" || user.roleId === roleFilter);
  }), [query, roleFilter, staff]);

  const roleName = (roleId) => roles.find((role) => role.id === roleId)?.name || "Unassigned";
  const runAction = (action) => {
    const result = action();
    if (!result.ok) setMessage(result.message);
  };
  const remove = (user) => {
    if (!window.confirm(`Remove ${user.name} from the admin team?`)) return;
    runAction(() => deleteStaff(user.id));
  };

  return <AdminShell>
    <PageHeading eyebrow="Super Admin" title="Staff users" description="Control who can enter the admin workspace and which role each team member receives." actions={<button className={buttonPrimary} onClick={() => setEditing({ ...emptyStaff, roleId: roles.find((role) => !role.system)?.id || roles[0]?.id })}><Plus size={16} /> Add staff user</button>} />
    <section className="mt-6 grid gap-3 sm:grid-cols-3"><Metric label="Total staff" value={staff.length} /><Metric label="Active users" value={staff.filter((user) => user.status === "Active").length} /><Metric label="Assigned roles" value={new Set(staff.map((user) => user.roleId)).size} /></section>
    {message && <div className="mt-5 flex items-center justify-between rounded-lg border border-[#231f20]/20 bg-white px-4 py-3 text-sm font-medium"><span>{message}</span><button onClick={() => setMessage("")} aria-label="Dismiss message"><X size={16} /></button></div>}
    <section className="mt-5 overflow-hidden rounded-lg border border-[#231f20]/10 bg-white">
      <div className="grid gap-3 border-b border-[#231f20]/10 p-4 sm:grid-cols-[minmax(220px,1fr)_220px]"><SearchField value={query} onChange={setQuery} placeholder="Search staff name or email" /><select className={inputClass} value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option>All</option>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></div>
      {filtered.length ? <>
        <div className="hidden overflow-x-auto md:block"><table className="w-full min-w-[880px] text-left text-sm"><thead className="bg-[#231f20]/[0.03] text-[10px] uppercase tracking-widest text-[#231f20]/50"><tr><th className="px-5 py-3">Staff member</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Last active</th><th className="px-5 py-3">Joined</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-[#231f20]/10">{filtered.map((user) => <tr key={user.id}><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#231f20] text-xs font-bold text-white">{initials(user.name)}</span><div><div className="flex items-center gap-2"><p className="font-semibold">{user.name}</p>{user.id === currentUserId && <StatusBadge tone="outline">You</StatusBadge>}</div><p className="mt-1 text-xs text-[#231f20]/45">{user.email}</p></div></div></td><td className="px-5 py-4"><div className="flex items-center gap-2"><ShieldCheck size={15} /> <span className="font-medium">{roleName(user.roleId)}</span></div></td><td className="px-5 py-4"><StatusBadge tone={user.status === "Active" ? "dark" : "soft"}>{user.status}</StatusBadge></td><td className="px-5 py-4 text-[#231f20]/55">{user.lastActive}</td><td className="px-5 py-4 text-[#231f20]/55">{user.joined}</td><td className="px-5 py-4"><div className="flex justify-end gap-1"><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={() => setEditing(user)} aria-label={`Edit ${user.name}`} title="Edit user"><Edit3 size={15} /></button><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15 disabled:opacity-35" onClick={() => runAction(() => toggleStaffStatus(user.id))} disabled={user.id === currentUserId} aria-label={`${user.status === "Active" ? "Deactivate" : "Activate"} ${user.name}`} title={user.status === "Active" ? "Deactivate" : "Activate"}><UserX size={15} /></button><button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15 disabled:opacity-35" onClick={() => remove(user)} disabled={user.id === currentUserId} aria-label={`Remove ${user.name}`} title="Remove user"><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>
        <div className="divide-y divide-[#231f20]/10 md:hidden">{filtered.map((user) => <article key={user.id} className="p-4"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#231f20] text-xs font-bold text-white">{initials(user.name)}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{user.name}</h2><StatusBadge tone={user.status === "Active" ? "dark" : "soft"}>{user.status}</StatusBadge></div><p className="mt-1 truncate text-xs text-[#231f20]/45">{user.email}</p><p className="mt-3 text-xs font-semibold">{roleName(user.roleId)}</p></div></div><div className="mt-4 flex gap-2"><button className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-[#231f20]/15 text-xs font-semibold" onClick={() => setEditing(user)}><Edit3 size={14} /> Edit</button><button className="flex h-9 w-10 items-center justify-center rounded-lg border border-[#231f20]/15 disabled:opacity-35" onClick={() => runAction(() => toggleStaffStatus(user.id))} disabled={user.id === currentUserId} aria-label={`${user.status === "Active" ? "Deactivate" : "Activate"} ${user.name}`}><UserX size={14} /></button><button className="flex h-9 w-10 items-center justify-center rounded-lg border border-[#231f20]/15 disabled:opacity-35" onClick={() => remove(user)} disabled={user.id === currentUserId} aria-label={`Remove ${user.name}`}><Trash2 size={14} /></button></div></article>)}</div>
      </> : <EmptyState icon={Search} title="No staff users found" description="Adjust the search or role filter to find a team member." />}
    </section>
    {editing && <StaffDialog initial={editing} roles={roles} currentUserId={currentUserId} onClose={() => setEditing(null)} onSave={(payload) => { const result = saveStaff(payload); if (!result.ok) return result; setEditing(null); return result; }} />}
  </AdminShell>;
}

function StaffDialog({ initial, roles, currentUserId, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const isCurrent = form.id === currentUserId;
  const submit = (event) => { event.preventDefault(); const result = onSave(form); if (!result.ok) setError(result.message); };
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#231f20]/55 sm:items-center sm:p-4"><button className="absolute inset-0" onClick={onClose} aria-label="Close staff form" /><form className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-lg bg-white p-5 sm:max-w-xl sm:rounded-lg sm:p-6" onSubmit={submit}><div className="flex items-start justify-between"><div><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#231f20] text-white"><UserCog size={18} /></span><h2 className="mt-4 text-xl font-semibold">{form.id ? "Edit staff user" : "Add staff user"}</h2><p className="mt-1 text-sm text-[#231f20]/50">Assign account access through a role.</p></div><button type="button" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#231f20]/15" onClick={onClose} aria-label="Close"><X size={17} /></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Full name"><input className={inputClass} value={form.name} onChange={(event) => update("name", event.target.value)} required /></Field><Field label="Email"><input className={inputClass} type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required /></Field><Field label={form.id ? "New password (optional)" : "Temporary password"}><input className={inputClass} type="password" value={form.password || ""} onChange={(event) => update("password", event.target.value)} required={!form.id} minLength={form.id ? undefined : 6} /></Field><Field label="Role"><select className={inputClass} value={form.roleId} onChange={(event) => update("roleId", event.target.value)} disabled={isCurrent}>{roles.map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</select></Field><Field label="Account status" className="sm:col-span-2"><select className={inputClass} value={form.status} onChange={(event) => update("status", event.target.value)} disabled={isCurrent}><option>Active</option><option>Inactive</option></select></Field></div>{isCurrent && <p className="mt-4 text-xs leading-5 text-[#231f20]/50">Your own role and status are protected to prevent accidental lockout.</p>}{error && <p className="mt-4 rounded-lg border border-[#231f20]/20 bg-[#231f20]/[0.04] px-3 py-2 text-sm font-medium">{error}</p>}<div className="mt-6 flex justify-end gap-2"><button type="button" className={buttonSecondary} onClick={onClose}>Cancel</button><button className={buttonPrimary}>Save user</button></div></form></div>;
}

function Field({ label, className = "", children }) { return <label className={`block ${className}`}><span className="mb-2 block text-xs font-semibold">{label}</span>{children}</label>; }
function Metric({ label, value }) { return <div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><p className="text-xs font-semibold text-[#231f20]/50">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>; }
function initials(name) { return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(); }
AdminTeamPage.adminPage = true;
