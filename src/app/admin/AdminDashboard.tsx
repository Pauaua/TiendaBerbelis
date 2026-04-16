"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Package, ShoppingBag, Mail, Leaf, X, Check, Database } from "lucide-react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  stock: number;
  featured: boolean;
  active: boolean;
  image: string | null;
  description: string | null;
};

type Order = {
  id: number;
  customerName: string;
  email: string;
  total: string;
  status: string;
  createdAt: string;
  items: { quantity: number; product: { name: string } }[];
};

type Contact = {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

const tabs = [
  { id: "products", label: "Productos", icon: <Package className="w-4 h-4" /> },
  { id: "orders", label: "Pedidos", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "contacts", label: "Mensajes", icon: <Mail className="w-4 h-4" /> },
];

const emptyForm = { name: "", price: "", stock: 0, image: "", description: "", featured: false, active: true };

export default function AdminDashboard({ password }: { password: string }) {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [seeding, setSeeding] = useState(false);

  const headers = { "Content-Type": "application/json", "x-admin-password": password };

  const loadProducts = useCallback(async () => {
    const res = await fetch("/api/admin/products", { headers: { "x-admin-password": password } });
    if (res.ok) setProducts(await res.json());
  }, [password]);

  const loadOrders = useCallback(async () => {
    const res = await fetch("/api/orders");
    if (res.ok) setOrders(await res.json());
  }, []);

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, [loadProducts, loadOrders]);

  const handleSave = async () => {
    const url = editId ? `/api/admin/products/${editId}` : "/api/admin/products";
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers, body: JSON.stringify({ ...form, price: parseFloat(form.price) }) });
    if (res.ok) {
      setShowForm(false);
      setEditId(null);
      setForm(emptyForm);
      loadProducts();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE", headers });
    loadProducts();
  };

  const handleEdit = (p: Product) => {
    setEditId(p.id);
    setForm({ name: p.name, price: p.price, stock: p.stock, image: p.image || "", description: p.description || "", featured: p.featured, active: p.active });
    setShowForm(true);
  };

  const handleSeed = async () => {
    setSeeding(true);
    await fetch("/api/admin/seed", { method: "POST", headers });
    await loadProducts();
    setSeeding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Berbelis Admin</span>
        </div>
        <Link href="/" className="text-sm text-purple-600 hover:underline">Ver tienda →</Link>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Productos", value: products.length, color: "purple" },
            { label: "Pedidos", value: orders.length, color: "violet" },
            { label: "Mensajes", value: contacts.length, color: "indigo" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); if (t.id === "contacts") fetch("/api/contact").then(r => r.json()).then(setContacts).catch(() => {}); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${tab === t.id ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-purple-50"}`}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Products tab */}
        {tab === "products" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Productos</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleSeed}
                  disabled={seeding}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-xl text-sm font-medium hover:bg-amber-200 transition-all"
                >
                  <Database className="w-4 h-4" />
                  {seeding ? "Cargando..." : "Seed inicial"}
                </button>
                <button
                  onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />Nuevo producto
                </button>
              </div>
            </div>

            {showForm && (
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{editId ? "Editar" : "Nuevo"} producto</h3>
                  <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Nombre", type: "text" },
                    { key: "price", label: "Precio ($)", type: "number" },
                    { key: "stock", label: "Stock", type: "number" },
                    { key: "image", label: "URL de imagen", type: "text" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.key as keyof typeof form] as string}
                        onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} className="rounded" />
                    Destacado
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))} className="rounded" />
                    Activo
                  </label>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700">
                    <Check className="w-4 h-4" />Guardar
                  </button>
                  <button onClick={() => setShowForm(false)} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200">
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-purple-50">
                  <tr>
                    {["Producto", "Precio", "Stock", "Estado", "Acciones"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-purple-50/30 transition-colors">
                      <td className="px-5 py-4 font-medium text-gray-900">{p.name}</td>
                      <td className="px-5 py-4 text-purple-600 font-semibold">${Number(p.price).toFixed(2)}</td>
                      <td className="px-5 py-4 text-gray-600">{p.stock}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {p.active ? "Activo" : "Inactivo"}
                        </span>
                        {p.featured && <span className="ml-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">Destacado</span>}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">No hay productos. Usa "Seed inicial" para cargar ejemplos.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders tab */}
        {tab === "orders" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pedidos</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-purple-50">
                  <tr>
                    {["#", "Cliente", "Email", "Total", "Estado", "Fecha"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-purple-700 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-purple-50/30">
                      <td className="px-5 py-4 text-gray-500">#{o.id}</td>
                      <td className="px-5 py-4 font-medium text-gray-900">{o.customerName}</td>
                      <td className="px-5 py-4 text-gray-600">{o.email}</td>
                      <td className="px-5 py-4 text-purple-600 font-semibold">${Number(o.total).toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">{o.status}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">No hay pedidos aún.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts tab */}
        {tab === "contacts" && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Mensajes de contacto</h2>
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{c.name}</p>
                      <p className="text-sm text-purple-600">{c.email}</p>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{c.message}</p>
                </div>
              ))}
              {contacts.length === 0 && (
                <div className="bg-white rounded-2xl p-10 text-center text-gray-400">No hay mensajes.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
