"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, type AuthUser } from "@/providers/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Tab = "personal" | "orders" | "addresses";
type OrderFilter = "all" | "in-progress" | "delivered";

interface OrderRow {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  deliveryAddress?: {
    country?: string;
    state?: string;
    city?: string;
    streetAddress?: string;
  };
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "In Progress",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, login, register, checkEmail, logout, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  // Auth-gate state (shown when not logged in)
  const [authStep, setAuthStep] = useState<"email" | "login" | "register">("email");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFirstName, setAuthFirstName] = useState("");
  const [authLastName, setAuthLastName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  // Personal Info state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "Nigeria",
    state: "",
    city: "",
    streetAddress: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Password state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  // Orders state
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("all");

  // Populate edit form from user
  useEffect(() => {
    if (user) {
      setEditForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        country: user.address?.country || "Nigeria",
        state: user.address?.state || "",
        city: user.address?.city || "",
        streetAddress: user.address?.streetAddress || "",
      });
    }
  }, [user]);

  // Fetch orders when tab changes
  useEffect(() => {
    if (activeTab === "orders" && user) {
      setIsLoadingOrders(true);
      fetch(`/api/orders?where[customer.email][equals]=${encodeURIComponent(user.email)}&sort=-createdAt&depth=0`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          const docs = Array.isArray(data?.docs) ? data.docs : [];
          setOrders(
            docs.map((doc: Record<string, unknown>) => ({
              id: String(doc.id),
              orderNumber: String(doc.orderNumber || ""),
              total: Number(doc.total || 0),
              status: String(doc.status || "pending"),
              createdAt: String(doc.createdAt || ""),
              deliveryAddress: doc.deliveryAddress as OrderRow["deliveryAddress"],
            })),
          );
        })
        .catch((err) => console.error("Failed to load orders:", err))
        .finally(() => setIsLoadingOrders(false));
    }
  }, [activeTab, user]);

  const filteredOrders = useMemo(() => {
    if (orderFilter === "all") return orders;
    if (orderFilter === "in-progress") return orders.filter((o) => ["pending", "processing", "shipped"].includes(o.status));
    return orders.filter((o) => o.status === "delivered");
  }, [orders, orderFilter]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage(null);
    try {
      await updateProfile({
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phone: editForm.phone,
        address: {
          country: editForm.country,
          state: editForm.state,
          city: editForm.city,
          streetAddress: editForm.streetAddress,
        },
      });
      setSaveMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("Passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage("Password must be at least 6 characters");
      return;
    }
    setIsChangingPassword(true);
    setPasswordMessage(null);
    try {
      await changePassword(passwordForm.oldPassword, passwordForm.newPassword);
      setPasswordMessage("Password changed successfully!");
      setShowPasswordForm(false);
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordMessage(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // --- Auth-gate handlers ---
  const handleEmailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim()) return;
    setAuthBusy(true);
    setAuthError(null);
    try {
      const exists = await checkEmail(authEmail.trim());
      setAuthStep(exists ? "login" : "register");
    } catch {
      setAuthError("Unable to verify email. Please try again.");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthBusy(true);
    setAuthError(null);
    try {
      await login(authEmail, authPassword);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setAuthBusy(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authFirstName.trim() || !authLastName.trim()) {
      setAuthError("Please enter your first and last name");
      return;
    }
    if (authPassword.length < 6) {
      setAuthError("Password must be at least 6 characters");
      return;
    }
    setAuthBusy(true);
    setAuthError(null);
    try {
      await register({
        email: authEmail,
        password: authPassword,
        firstName: authFirstName.trim(),
        lastName: authLastName.trim(),
        phone: authPhone.trim() || undefined,
      });
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setAuthBusy(false);
    }
  };

  const authInputClass =
    "w-full bg-white border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green/30 font-sans text-brand-dark placeholder:text-brand-muted/50";

  // --- Loading state ---
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-32 pb-24 bg-brand-light-bg">
          <div className="section-container flex items-center justify-center min-h-[40vh]">
            <div className="animate-pulse text-brand-muted font-sans">Loading...</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // --- Not logged in: show auth gate ---
  if (!user) {
    return (
      <>
        <Navbar />
        <main className="flex-grow pt-32 pb-24 bg-brand-light-bg" id="profile-auth-gate">
          <div className="section-container flex items-center justify-center min-h-[50vh]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-brand-green/5 p-8">
              <h1 className="heading-md text-2xl text-brand-green mb-2 text-center">My Account</h1>

              {authStep === "email" && (
                <>
                  <p className="text-sm text-brand-muted text-center mb-6 font-sans">
                    Enter your email to sign in or create an account.
                  </p>
                  <form onSubmit={handleEmailCheck} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email address"
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      className={authInputClass}
                      required
                      autoFocus
                    />
                    {authError && <p className="text-red-500 text-xs font-sans">{authError}</p>}
                    <button
                      type="submit"
                      disabled={authBusy}
                      className="w-full bg-brand-green text-white font-semibold py-3 rounded-xl hover:bg-brand-green/90 transition-colors text-sm disabled:opacity-60"
                    >
                      {authBusy ? "Checking..." : "Continue"}
                    </button>
                  </form>
                </>
              )}

              {authStep === "login" && (
                <>
                  <p className="text-sm text-brand-muted text-center mb-1 font-sans">
                    Welcome back!
                  </p>
                  <p className="text-xs text-brand-muted text-center mb-6 font-sans">
                    Sign in as <span className="font-medium text-brand-dark">{authEmail}</span>
                  </p>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input
                      type="password"
                      placeholder="Password"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className={authInputClass}
                      required
                      autoFocus
                    />
                    {authError && <p className="text-red-500 text-xs font-sans">{authError}</p>}
                    <button
                      type="submit"
                      disabled={authBusy}
                      className="w-full bg-brand-green text-white font-semibold py-3 rounded-xl hover:bg-brand-green/90 transition-colors text-sm disabled:opacity-60"
                    >
                      {authBusy ? "Signing in..." : "Sign In"}
                    </button>
                  </form>
                  <button
                    onClick={() => { setAuthStep("email"); setAuthError(null); setAuthPassword(""); }}
                    className="mt-4 text-xs text-brand-green hover:underline font-sans w-full text-center"
                  >
                    ← Use a different email
                  </button>
                </>
              )}

              {authStep === "register" && (
                <>
                  <p className="text-sm text-brand-muted text-center mb-1 font-sans">
                    Create your account
                  </p>
                  <p className="text-xs text-brand-muted text-center mb-6 font-sans">
                    Signing up as <span className="font-medium text-brand-dark">{authEmail}</span>
                  </p>
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First name"
                        value={authFirstName}
                        onChange={(e) => setAuthFirstName(e.target.value)}
                        className={authInputClass}
                        required
                        autoFocus
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={authLastName}
                        onChange={(e) => setAuthLastName(e.target.value)}
                        className={authInputClass}
                        required
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone number (optional)"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      className={authInputClass}
                    />
                    <input
                      type="password"
                      placeholder="Create a password (min 6 chars)"
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className={authInputClass}
                      required
                    />
                    {authError && <p className="text-red-500 text-xs font-sans">{authError}</p>}
                    <button
                      type="submit"
                      disabled={authBusy}
                      className="w-full bg-brand-green text-white font-semibold py-3 rounded-xl hover:bg-brand-green/90 transition-colors text-sm disabled:opacity-60"
                    >
                      {authBusy ? "Creating account..." : "Create Account"}
                    </button>
                  </form>
                  <button
                    onClick={() => { setAuthStep("email"); setAuthError(null); setAuthPassword(""); }}
                    className="mt-4 text-xs text-brand-green hover:underline font-sans w-full text-center"
                  >
                    ← Use a different email
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const inputClass =
    "w-full bg-white border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green/30 font-sans text-brand-dark";
  const inputReadOnly =
    "w-full bg-brand-light-bg border border-brand-green/5 rounded-xl px-4 py-3 text-sm font-sans text-brand-muted";

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-brand-light-bg" id="profile-page">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-1" id="profile-sidebar">
              <h2 className="heading-md text-lg font-bold text-brand-green mb-6">
                Hello, {user.firstName}
              </h2>

              {(
                [
                  { key: "personal", label: "Personal Info" },
                  { key: "orders", label: "My Orders" },
                  { key: "addresses", label: "Addresses" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`block w-full text-left py-3 px-1 font-sans text-sm border-b border-brand-green/10 transition-colors duration-200 ${
                    activeTab === tab.key
                      ? "font-bold text-brand-dark"
                      : "text-brand-muted hover:text-brand-dark"
                  }`}
                  id={`profile-tab-${tab.key}`}
                >
                  {tab.label}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="block w-full text-left py-3 px-1 font-sans text-sm text-brand-muted hover:text-red-600 border-b border-brand-green/10 transition-colors duration-200"
                id="profile-logout-btn"
              >
                Logout
              </button>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 bg-brand-cream/50 rounded-2xl p-6 md:p-10 min-h-[420px] border border-brand-green/5">
              {/* PERSONAL INFO TAB */}
              {activeTab === "personal" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="heading-lg text-xl font-bold uppercase tracking-wide">
                      Personal Info
                    </h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-brand-green text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-brand-green-dark transition-colors"
                        id="profile-edit-btn"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setSaveMessage(null);
                          }}
                          className="text-xs font-semibold px-5 py-2 rounded-lg border border-brand-green/20 text-brand-muted hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-brand-green text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-brand-green-dark transition-colors disabled:opacity-50"
                          id="profile-save-btn"
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                      </div>
                    )}
                  </div>

                  {saveMessage && (
                    <p
                      className={`text-sm font-sans ${
                        saveMessage.includes("success") ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {saveMessage}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm((p) => ({ ...p, firstName: e.target.value }))}
                          className={inputClass}
                        />
                      ) : (
                        <div className={inputReadOnly}>{user.firstName}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm((p) => ({ ...p, lastName: e.target.value }))}
                          className={inputClass}
                        />
                      ) : (
                        <div className={inputReadOnly}>{user.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">Email</label>
                      <div className={inputReadOnly}>{user.email}</div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm((p) => ({ ...p, phone: e.target.value }))}
                          className={inputClass}
                          placeholder="Phone number"
                        />
                      ) : (
                        <div className={inputReadOnly}>{user.phone || "—"}</div>
                      )}
                    </div>
                  </div>

                  {/* Change Password */}
                  <div className="border-t border-brand-green/10 pt-6">
                    {!showPasswordForm ? (
                      <button
                        onClick={() => setShowPasswordForm(true)}
                        className="heading-md text-sm font-bold text-brand-green hover:underline"
                        id="profile-change-password-btn"
                      >
                        Change Password
                      </button>
                    ) : (
                      <div className="space-y-4 max-w-md">
                        <h4 className="heading-md text-sm font-bold">Change Password</h4>
                        {passwordMessage && (
                          <p
                            className={`text-sm font-sans ${
                              passwordMessage.includes("success") ? "text-green-600" : "text-red-500"
                            }`}
                          >
                            {passwordMessage}
                          </p>
                        )}
                        <input
                          type="password"
                          placeholder="Current password"
                          value={passwordForm.oldPassword}
                          onChange={(e) =>
                            setPasswordForm((p) => ({ ...p, oldPassword: e.target.value }))
                          }
                          className={inputClass}
                        />
                        <input
                          type="password"
                          placeholder="New password"
                          value={passwordForm.newPassword}
                          onChange={(e) =>
                            setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
                          }
                          className={inputClass}
                        />
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) =>
                            setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))
                          }
                          className={inputClass}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowPasswordForm(false);
                              setPasswordMessage(null);
                            }}
                            className="text-xs font-semibold px-5 py-2 rounded-lg border border-brand-green/20 text-brand-muted hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleChangePassword}
                            disabled={isChangingPassword}
                            className="bg-brand-green text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-brand-green-dark transition-colors disabled:opacity-50"
                          >
                            {isChangingPassword ? "Changing..." : "Update Password"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MY ORDERS TAB */}
              {activeTab === "orders" && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="heading-lg text-xl font-bold uppercase tracking-wide">My Orders</h3>

                  <div className="flex gap-2">
                    {(
                      [
                        { key: "all", label: "All" },
                        { key: "in-progress", label: "In Progress" },
                        { key: "delivered", label: "Delivered" },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setOrderFilter(f.key)}
                        className={`text-xs font-sans font-semibold px-4 py-2 rounded-full border transition-colors ${
                          orderFilter === f.key
                            ? "bg-brand-green text-white border-brand-green"
                            : "bg-white text-brand-muted border-brand-green/15 hover:border-brand-green/30"
                        }`}
                        id={`orders-filter-${f.key}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {isLoadingOrders ? (
                    <p className="text-sm text-brand-muted font-sans animate-pulse">Loading orders...</p>
                  ) : filteredOrders.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-brand-muted font-sans text-sm">You have no orders yet.</p>
                      <Link
                        href="/shop"
                        className="inline-block mt-4 text-brand-green font-semibold text-sm hover:underline"
                      >
                        Start Shopping →
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm font-sans">
                        <thead>
                          <tr className="border-b border-brand-green/10">
                            <th className="text-left py-3 font-bold text-brand-dark">Order Number</th>
                            <th className="text-left py-3 font-bold text-brand-dark">Cost</th>
                            <th className="text-left py-3 font-bold text-brand-dark">Order Status</th>
                            <th className="text-left py-3 font-bold text-brand-dark">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map((order) => (
                            <tr key={order.id} className="border-b border-brand-green/5 hover:bg-brand-cream/30 transition-colors">
                              <td className="py-3 font-mono text-xs text-brand-dark">{order.orderNumber}</td>
                              <td className="py-3 text-brand-dark">₦{order.total.toLocaleString()}</td>
                              <td className="py-3">
                                <span
                                  className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                                    STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {STATUS_LABELS[order.status] || order.status}
                                </span>
                              </td>
                              <td className="py-3 text-brand-muted text-xs">
                                {order.createdAt
                                  ? new Date(order.createdAt).toLocaleDateString("en-NG", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === "addresses" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h3 className="heading-lg text-xl font-bold uppercase tracking-wide">
                      Saved Address
                    </h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-brand-green text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-brand-green-dark transition-colors"
                      >
                        Edit
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setSaveMessage(null);
                          }}
                          className="text-xs font-semibold px-5 py-2 rounded-lg border border-brand-green/20 text-brand-muted hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-brand-green text-white text-xs font-semibold px-5 py-2 rounded-lg hover:bg-brand-green-dark transition-colors disabled:opacity-50"
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                      </div>
                    )}
                  </div>

                  {saveMessage && (
                    <p
                      className={`text-sm font-sans ${
                        saveMessage.includes("success") ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {saveMessage}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">Country</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.country}
                          onChange={(e) => setEditForm((p) => ({ ...p, country: e.target.value }))}
                          className={inputClass}
                        />
                      ) : (
                        <div className={inputReadOnly}>{user.address?.country || "Nigeria"}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">State</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.state}
                          onChange={(e) => setEditForm((p) => ({ ...p, state: e.target.value }))}
                          className={inputClass}
                          placeholder="Your state"
                        />
                      ) : (
                        <div className={inputReadOnly}>{user.address?.state || "—"}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">City</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.city}
                          onChange={(e) => setEditForm((p) => ({ ...p, city: e.target.value }))}
                          className={inputClass}
                          placeholder="Your city"
                        />
                      ) : (
                        <div className={inputReadOnly}>{user.address?.city || "—"}</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-brand-dark">Street Address</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.streetAddress}
                          onChange={(e) => setEditForm((p) => ({ ...p, streetAddress: e.target.value }))}
                          className={inputClass}
                          placeholder="House number, street, landmark"
                        />
                      ) : (
                        <div className={inputReadOnly}>{user.address?.streetAddress || "—"}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
