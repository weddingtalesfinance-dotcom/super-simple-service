import { useEffect, useState } from "react";

type Role = "client" | "sp" | null;
type Step = "s1" | "s2-client" | "s2-sp" | "s3-client" | "s3-sp" | "s-sp-done";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const SP_TYPES = [
  { icon: "📸", label: "Photographer" },
  { icon: "🎬", label: "Videographer" },
  { icon: "💄", label: "Makeup Artist" },
  { icon: "🌸", label: "Beauty Parlour" },
  { icon: "🎨", label: "Decorator" },
  { icon: "🏛", label: "Venue / Hall" },
  { icon: "🎵", label: "DJ / Music" },
  { icon: "🍽", label: "Catering" },
  { icon: "💐", label: "Florist" },
  { icon: "🎪", label: "Event Planner" },
  { icon: "🥁", label: "Band / Baja" },
  { icon: "➕", label: "Other" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  preselect?: Role;
}

const Progress = ({ filled }: { filled: number }) => (
  <div className="flex gap-1.5 mb-6">
    {[0, 1, 2].map((i) => (
      <div key={i} className={`h-[3px] rounded-sm flex-1 transition-colors ${i < filled ? "bg-brand" : "bg-border"}`} />
    ))}
  </div>
);

const RoleCard = ({ icon, title, desc, selected, onClick }: { icon: string; title: string; desc: string; selected: boolean; onClick: () => void; }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative text-center rounded-[10px] border-[1.5px] p-5 transition-all ${selected ? "border-brand bg-[hsl(var(--brand)/0.08)]" : "border-border hover:border-brand hover:bg-brand-soft"}`}
  >
    {selected && (
      <div className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-brand flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>
    )}
    <div className="text-[28px] mb-2">{icon}</div>
    <div className="text-sm font-semibold text-ink mb-0.5">{title}</div>
    <div className="text-[11px] text-muted-foreground leading-snug">{desc}</div>
  </button>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="w-full px-3.5 py-[11px] border-[1.5px] border-border rounded-md text-sm text-ink outline-none focus:border-brand transition-colors font-sans" />
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-5">
    <label className="text-xs font-medium text-foreground mb-1.5 block tracking-wide">{label}</label>
    {children}
  </div>
);

const PrimaryBtn = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button onClick={onClick} className="w-full bg-brand hover:bg-[hsl(var(--primary-hover))] text-primary-foreground text-sm font-semibold py-3 rounded-md transition-colors tracking-wide">{children}</button>
);

const GoogleBtn = () => (
  <button onClick={() => alert("Google OAuth would trigger here — connect to your Supabase Google provider.")} className="w-full flex items-center justify-center gap-2.5 py-3 border-[1.5px] border-border rounded-md bg-background text-sm font-medium text-foreground hover:border-brand transition-colors">
    <GoogleIcon /> Continue with Google
  </button>
);

const Divider = () => (
  <div className="flex items-center gap-4 my-5">
    <div className="flex-1 h-px bg-border" />
    <span className="text-xs text-muted-foreground/70">or fill in details</span>
    <div className="flex-1 h-px bg-border" />
  </div>
);

const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="bg-transparent text-sm text-muted-foreground hover:text-brand mb-5 flex items-center gap-1.5">← Back</button>
);

export const SignupModal = ({ open, onClose, preselect }: Props) => {
  const [step, setStep] = useState<Step>("s1");
  const [role, setRole] = useState<Role>(null);
  const [spSelected, setSpSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (open) {
      setStep("s1");
      setSpSelected(new Set());
      if (preselect === "sp") setRole("sp");
      else setRole(null);
    }
  }, [open, preselect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const goStep2 = () => {
    if (!role) { alert("Please select who you are first."); return; }
    setStep(role === "client" ? "s2-client" : "s2-sp");
  };
  const goStep3SP = () => {
    if (spSelected.size === 0) { alert("Please select at least one service category."); return; }
    setStep("s3-sp");
  };
  const toggleSP = (i: number) => {
    setSpSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const filled = step === "s1" ? 1 : step.startsWith("s2") ? 2 : 3;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-background rounded-2xl w-full max-w-[500px] overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <div className="px-8 pt-8 pb-6 text-center" style={{ background: "var(--gradient-modal-header)" }}>
          <div className="font-display text-lg font-bold text-white">
            Xito<span className="text-brand-light">.</span>Events
          </div>
          <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center text-base">✕</button>
        </div>

        <div className="p-8">
          {step === "s1" && (
            <div>
              <Progress filled={filled} />
              <div className="text-[10px] tracking-[0.2em] uppercase text-brand mb-2 font-medium">Step 1 of 3</div>
              <h3 className="font-display text-[22px] font-semibold text-ink mb-2 leading-tight">Welcome! Who are you?</h3>
              <p className="text-[13px] text-muted-foreground mb-7 leading-relaxed">Tell us how you'd like to use Xito Events so we can personalise your experience.</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <RoleCard icon="💍" title="I'm a Client" desc="Planning a wedding or event and looking for vendors" selected={role === "client"} onClick={() => setRole("client")} />
                <RoleCard icon="🎯" title="I'm a Service Provider" desc="Offering event services and want to reach more clients" selected={role === "sp"} onClick={() => setRole("sp")} />
              </div>
              <PrimaryBtn onClick={goStep2}>Continue →</PrimaryBtn>
            </div>
          )}

          {step === "s2-client" && (
            <div>
              <Progress filled={filled} />
              <BackBtn onClick={() => setStep("s1")} />
              <div className="text-[10px] tracking-[0.2em] uppercase text-brand mb-2 font-medium">Step 2 of 3 · Client</div>
              <h3 className="font-display text-[22px] font-semibold text-ink mb-2 leading-tight">Plan your perfect event 💍</h3>
              <p className="text-[13px] text-muted-foreground mb-7 leading-relaxed">Create your free account to browse verified vendors and start planning.</p>
              <GoogleBtn />
              <Divider />
              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name"><Input type="text" placeholder="Anita" /></Field>
                <Field label="Last Name"><Input type="text" placeholder="Sharma" /></Field>
              </div>
              <Field label="Email Address"><Input type="email" placeholder="anita@gmail.com" /></Field>
              <Field label="Phone Number"><Input type="tel" placeholder="+977 98XXXXXXXX" /></Field>
              <Field label="Event Type">
                <select className="w-full px-3.5 py-[11px] border-[1.5px] border-border rounded-md text-sm text-ink outline-none focus:border-brand bg-background">
                  <option value="">What are you planning?</option>
                  <option>Wedding</option>
                  <option>Engagement / Bratabandha</option>
                  <option>Corporate Event</option>
                  <option>Birthday / Anniversary</option>
                  <option>Other</option>
                </select>
              </Field>
              <PrimaryBtn onClick={() => setStep("s3-client")}>Create My Account →</PrimaryBtn>
            </div>
          )}

          {step === "s2-sp" && (
            <div>
              <Progress filled={filled} />
              <BackBtn onClick={() => setStep("s1")} />
              <div className="text-[10px] tracking-[0.2em] uppercase text-brand mb-2 font-medium">Step 2 of 3 · Service Provider</div>
              <h3 className="font-display text-[22px] font-semibold text-ink mb-2 leading-tight">What kind of services do you offer?</h3>
              <p className="text-[13px] text-muted-foreground mb-7 leading-relaxed">Select your category — you can add more services later from your dashboard.</p>
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                {SP_TYPES.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleSP(i)}
                    className={`text-center rounded-[10px] border-[1.5px] py-4 px-3 transition-all ${spSelected.has(i) ? "border-brand bg-[hsl(var(--brand)/0.08)]" : "border-border hover:border-brand hover:bg-brand-soft"}`}
                  >
                    <div className="text-[22px] mb-1.5">{t.icon}</div>
                    <div className="text-[11px] font-semibold text-foreground">{t.label}</div>
                  </button>
                ))}
              </div>
              <PrimaryBtn onClick={goStep3SP}>Continue →</PrimaryBtn>
            </div>
          )}

          {step === "s3-client" && (
            <div className="text-center py-4">
              <Progress filled={3} />
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-display text-[22px] font-semibold text-ink mb-2">You're all set!</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Your account is created. Start browsing Nepal's top event vendors and build your dream event team.</p>
              <PrimaryBtn>Browse Vendors →</PrimaryBtn>
            </div>
          )}

          {step === "s3-sp" && (
            <div>
              <Progress filled={3} />
              <BackBtn onClick={() => setStep("s2-sp")} />
              <div className="text-[10px] tracking-[0.2em] uppercase text-brand mb-2 font-medium">Step 3 of 3 · Service Provider</div>
              <h3 className="font-display text-[22px] font-semibold text-ink mb-2 leading-tight">Almost there! Set up your profile 🎯</h3>
              <p className="text-[13px] text-muted-foreground mb-7 leading-relaxed">Fill in your details to get discovered by clients across Nepal.</p>
              <GoogleBtn />
              <Divider />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Full Name"><Input type="text" placeholder="Your name" /></Field>
                <Field label="Business Name"><Input type="text" placeholder="Studio / Brand name" /></Field>
              </div>
              <Field label="Email Address"><Input type="email" placeholder="you@example.com" /></Field>
              <Field label="Phone Number"><Input type="tel" placeholder="+977 98XXXXXXXX" /></Field>
              <Field label="City / District"><Input type="text" placeholder="Kathmandu, Pokhara..." /></Field>
              <PrimaryBtn onClick={() => setStep("s-sp-done")}>Create My Profile →</PrimaryBtn>
            </div>
          )}

          {step === "s-sp-done" && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-display text-[22px] font-semibold text-ink mb-2">Profile created!</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-6">Welcome to Xito Events. Your profile is under review — once verified, clients across Nepal can discover and book you.</p>
              <PrimaryBtn>Go to My Dashboard →</PrimaryBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
