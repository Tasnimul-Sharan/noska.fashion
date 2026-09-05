import { Check, KeyRound, LockKeyhole, Plus, Save, ShieldCheck, Trash2, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { PageHeading, StatusBadge, buttonPrimary, buttonSecondary, inputClass } from "@/components/admin/AdminUi";
import { adminPermissions, useAdmin } from "@/context/AdminContext";

export default function AdminRolesPage() {
  const { roles, staff, saveRole, deleteRole } = useAdmin();
  const [selectedId, setSelectedId] = useState(roles[0]?.id);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");
  const selected = roles.find((role) => role.id === selectedId) || roles[0];

  const remove = () => {
    if (!window.confirm(`Delete the ${selected.name} role?`)) return;
    const result = deleteRole(selected.id);
    if (!result.ok) { setMessage(result.message); return; }
    setSelectedId(roles.find((role) => role.id !== selected.id)?.id);
  };

  return <AdminShell>
    <PageHeading eyebrow="Super Admin" title="Roles & access" description="Define exactly which admin sections each staff role can view and manage." actions={<button className={buttonPrimary} onClick={() => setCreating(true)}><Plus size={16} /> Create role</button>} />
    <section className="mt-6 grid gap-3 sm:grid-cols-3"><Metric label="Roles" value={roles.length} /><Metric label="Permission areas" value={adminPermissions.length} /><Metric label="Staff assignments" value={staff.length} /></section>
    {message && <div className="mt-5 rounded-lg border border-[#231f20]/20 bg-white px-4 py-3 text-sm font-medium">{message}</div>}
    <section className="mt-5 grid overflow-hidden rounded-lg border border-[#231f20]/10 bg-white lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="border-b border-[#231f20]/10 p-3 lg:border-b-0 lg:border-r">
        <p className="px-2 pb-3 pt-1 text-[10px] font-bold uppercase tracking-widest text-[#231f20]/45">Available roles</p>
        <div className="grid gap-1">{roles.map((role) => {
          const count = staff.filter((user) => user.roleId === role.id).length;
          return <button key={role.id} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left ${selected?.id === role.id ? "bg-[#231f20] text-white" : "hover:bg-[#231f20]/[0.04]"}`} onClick={() => { setSelectedId(role.id); setMessage(""); }}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected?.id === role.id ? "bg-white/10" : "bg-[#231f20]/[0.06]"}`}>{role.system ? <LockKeyhole size={16} /> : <KeyRound size={16} />}</span><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{role.name}</strong><small className={`mt-1 block ${selected?.id === role.id ? "text-white/50" : "text-[#231f20]/45"}`}>{count} staff · {role.permissions.length} permissions</small></span></button>;
        })}</div>
      </aside>
      {selected && <RoleEditor key={selected.id} role={selected} assignedStaff={staff.filter((user) => user.roleId === selected.id)} onSave={(payload) => { const result = saveRole(payload); setMessage(result.ok ? "Role permissions saved." : result.message); return result; }} onDelete={remove} />}
    </section>
    {creating && <RoleDialog onClose={() => setCreating(false)} onSave={(payload) => { const result = saveRole(payload); if (result.ok) { setSelectedId(result.role.id); setCreating(false); setMessage("New role created."); } return result; }} />}
  </AdminShell>;
}

function RoleEditor({ role, assignedStaff, onSave, onDelete }) {
  const [form, setForm] = useState(role);
  const [saved, setSaved] = useState(false);
  const toggle = (permission) => setForm((current) => ({ ...current, permissions: current.permissions.includes(permission) ? current.permissions.filter((item) => item !== permission) : [...current.permissions, permission] }));
  const submit = (event) => { event.preventDefault(); const result = onSave(form); if (result.ok) { setSaved(true); window.setTimeout(() => setSaved(false), 1500); } };
  const groups = useMemo(() => [...new Set(adminPermissions.map((permission) => permission.group))], []);

  return <form onSubmit={submit}>
    <div className="flex flex-col gap-4 border-b border-[#231f20]/10 p-5 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold">{role.name}</h2>{role.system && <StatusBadge tone="dark">System role</StatusBadge>}</div><p className="mt-2 max-w-2xl text-sm leading-6 text-[#231f20]/50">{role.description}</p></div><div className="flex shrink-0 gap-2">{!role.system && <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#231f20]/20" onClick={onDelete} aria-label="Delete role" title="Delete role"><Trash2 size={16} /></button>}<button className={buttonPrimary} disabled={role.system}>{saved ? <Check size={16} /> : <Save size={16} />}{saved ? "Saved" : role.system ? "Protected" : "Save access"}</button></div></div>
    <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_280px]">
      <div>{groups.map((group) => <section key={group} className="mb-6 last:mb-0"><h3 className="text-xs font-bold uppercase tracking-widest text-[#231f20]/45">{group}</h3><div className="mt-3 grid gap-2">{adminPermissions.filter((permission) => permission.group === group).map((permission) => { const enabled = form.permissions.includes(permission.id); return <label key={permission.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${enabled ? "border-[#231f20]/35 bg-[#231f20]/[0.03]" : "border-[#231f20]/10 bg-white"}`}><input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#231f20]" checked={enabled} onChange={() => toggle(permission.id)} disabled={role.system} /><span><strong className="block text-sm">{permission.label}</strong><small className="mt-1 block leading-5 text-[#231f20]/50">{permission.description}</small></span></label>; })}</div></section>)}</div>
      <aside className="h-fit rounded-lg border border-[#231f20]/10 bg-[#231f20]/[0.025] p-4"><div className="flex items-center gap-2"><UsersRound size={17} /><h3 className="text-sm font-semibold">Assigned staff</h3></div>{assignedStaff.length ? <div className="mt-4 grid gap-3">{assignedStaff.map((user) => <div key={user.id} className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#231f20] text-[10px] font-bold text-white">{initials(user.name)}</span><span className="min-w-0"><strong className="block truncate text-xs">{user.name}</strong><small className="block truncate text-[10px] text-[#231f20]/45">{user.email}</small></span></div>)}</div> : <p className="mt-4 text-xs leading-5 text-[#231f20]/50">No staff users currently have this role.</p>}</aside>
    </div>
  </form>;
}

function RoleDialog({ onClose, onSave }) {
  const [form, setForm] = useState({ id: "", name: "", description: "", permissions: ["view_dashboard"], system: false });
  const [error, setError] = useState("");
  const submit = (event) => { event.preventDefault(); const result = onSave(form); if (!result.ok) setError(result.message); };
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#231f20]/55 sm:items-center sm:p-4"><button className="absolute inset-0" onClick={onClose} aria-label="Close role form" /><form className="relative w-full rounded-t-lg bg-white p-5 sm:max-w-lg sm:rounded-lg sm:p-6" onSubmit={submit}><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#231f20] text-white"><ShieldCheck size={18} /></span><h2 className="mt-4 text-xl font-semibold">Create role</h2><p className="mt-1 text-sm text-[#231f20]/50">Start with dashboard access, then configure all permissions.</p><div className="mt-6 grid gap-4"><Field label="Role name"><input className={inputClass} value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} required /></Field><Field label="Description"><textarea className={`${inputClass} min-h-24 py-3`} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required /></Field></div>{error && <p className="mt-4 rounded-lg border border-[#231f20]/20 bg-[#231f20]/[0.04] px-3 py-2 text-sm font-medium">{error}</p>}<div className="mt-6 flex justify-end gap-2"><button type="button" className={buttonSecondary} onClick={onClose}>Cancel</button><button className={buttonPrimary}>Create role</button></div></form></div>;
}

function Field({ label, children }) { return <label className="block"><span className="mb-2 block text-xs font-semibold">{label}</span>{children}</label>; }
function Metric({ label, value }) { return <div className="rounded-lg border border-[#231f20]/10 bg-white p-5"><p className="text-xs font-semibold text-[#231f20]/50">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>; }
function initials(name) { return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase(); }
AdminRolesPage.adminPage = true;
