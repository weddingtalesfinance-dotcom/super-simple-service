import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isClient = searchParams.get('role') === 'client';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirm?: string }>({});

  const inputStyle = {
    background: 'hsl(6 45% 97%)',
    border: '1px solid hsl(6 28% 89%)',
    color: 'hsl(6 38% 14%)',
    fontFamily: 'Poppins, sans-serif',
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = '1px solid hsl(4 72% 60%)';
    e.currentTarget.style.boxShadow = '0 0 0 3px hsl(4 72% 60% / 0.14)';
    e.currentTarget.style.background = '#fff';
  };

  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = '1px solid hsl(6 28% 89%)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.background = 'hsl(6 45% 97%)';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirm) newErrors.confirm = 'Passwords do not match';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setErrors({});
    setSubmitting(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: { emailRedirectTo: undefined },
    });

    if (signUpError) {
      setSubmitting(false);
      setErrors({ email: signUpError.message });
      return;
    }

    if (signUpData.session) {
      setSubmitting(false);
      toast.success("Account created! Welcome to Xito Events.");
      navigate('/');
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setSubmitting(false);

    if (signInError) {
      toast.success('Account created! You can now log in.');
      navigate('/login?role=provider');
    } else {
      toast.success("Account created! Welcome to Xito Events.");
      navigate('/');
    }
  };

  const handleGoogle = async () => {
    setGoogleSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      toast.error(error.message || 'Failed to sign in with Google');
      setGoogleSubmitting(false);
    }
  };

  const btnDisabled = submitting || !email.trim() || !password || !confirm;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 15% 10%, hsl(4 75% 93%) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 85%, hsl(6 65% 94%) 0%, transparent 40%),
          hsl(6 55% 97%)
        `,
      }}
    >
      {/* Decorative orbs */}
      <div className="absolute pointer-events-none" style={{ top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, hsl(4 72% 91%) 0%, transparent 65%)', opacity: 0.65 }} />
      <div className="absolute pointer-events-none" style={{ bottom: '-80px', left: '-50px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, hsl(6 55% 92%) 0%, transparent 65%)', opacity: 0.55 }} />

      {/* Back button — fixed top left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 flex items-center gap-1.5 transition-colors active:scale-95"
        style={{ color: 'hsl(6 14% 52%)', fontFamily: 'Poppins, sans-serif', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="relative w-full max-w-[360px]">

        {/* Brand */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white text-[28px] font-bold"
            style={{ background: 'linear-gradient(135deg, hsl(4 72% 56%) 0%, hsl(340 62% 58%) 100%)', boxShadow: '0 8px 28px hsl(4 72% 54% / 0.30)', fontFamily: 'Cormorant Garamond, Georgia, serif' }}
          >
            X
          </div>
          <div className="text-center">
            <h1
              className="text-[34px] leading-none font-normal tracking-wide"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: 'hsl(6 38% 14%)' }}
            >
              Xito Events
            </h1>
            <p className="text-[12px] mt-1.5" style={{ color: 'hsl(6 14% 52%)', fontFamily: 'Poppins, sans-serif' }}>
              {isClient ? 'Create your Client account' : 'Create your Service Provider account'}
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-6"
          style={{
            background: 'rgba(255,255,255,0.88)',
            border: '1px solid hsl(6 28% 89%)',
            boxShadow: '0 4px 32px hsl(6 28% 50% / 0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Email */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.email ? 'hsl(4 72% 54%)' : 'hsl(6 14% 54%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full h-11 pl-10 pr-4 rounded-xl text-[13px] transition-all focus:outline-none"
                  style={{ ...inputStyle, border: errors.email ? '1px solid hsl(4 72% 54%)' : inputStyle.border }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>
              {errors.email && <p className="text-[11px] mt-1 pl-1" style={{ color: 'hsl(4 72% 52%)', fontFamily: 'Poppins, sans-serif' }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.password ? 'hsl(4 72% 54%)' : 'hsl(6 14% 54%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full h-11 pl-10 pr-11 rounded-xl text-[13px] transition-all focus:outline-none"
                  style={{ ...inputStyle, border: errors.password ? '1px solid hsl(4 72% 54%)' : inputStyle.border }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'hsl(6 14% 54%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] mt-1 pl-1" style={{ color: 'hsl(4 72% 52%)', fontFamily: 'Poppins, sans-serif' }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.confirm ? 'hsl(4 72% 54%)' : 'hsl(6 14% 54%)' }} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: undefined })); }}
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className="w-full h-11 pl-10 pr-11 rounded-xl text-[13px] transition-all focus:outline-none"
                  style={{ ...inputStyle, border: errors.confirm ? '1px solid hsl(4 72% 54%)' : inputStyle.border }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'hsl(6 14% 54%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirm && <p className="text-[11px] mt-1 pl-1" style={{ color: 'hsl(4 72% 52%)', fontFamily: 'Poppins, sans-serif' }}>{errors.confirm}</p>}
            </div>

            {/* Create Account */}
            <button
              type="submit"
              disabled={btnDisabled}
              className="w-full h-11 rounded-xl text-[13px] font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 mt-1"
              style={{
                background: 'linear-gradient(135deg, hsl(4 72% 56%) 0%, hsl(340 62% 58%) 100%)',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: btnDisabled ? 'none' : '0 4px 18px hsl(4 72% 54% / 0.30)',
              }}
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px" style={{ background: 'hsl(6 28% 89%)' }} />
              <span className="text-[11px]" style={{ color: 'hsl(6 14% 58%)', fontFamily: 'Poppins, sans-serif' }}>or</span>
              <div className="flex-1 h-px" style={{ background: 'hsl(6 28% 89%)' }} />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={googleSubmitting}
              className="w-full h-11 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] disabled:opacity-50"
              style={{
                background: '#fff',
                border: '1px solid hsl(6 28% 89%)',
                color: 'hsl(6 38% 18%)',
                fontFamily: 'Poppins, sans-serif',
                boxShadow: '0 1px 6px hsl(6 14% 50% / 0.10)',
              }}
            >
              {googleSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                  <path d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.2 7.3-10.5 7.3-17.5z" fill="#4285F4"/>
                  <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.1 1.4-4.8 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.6v6.1C6.5 42.6 14.7 48 24 48z" fill="#34A853"/>
                  <path d="M10.8 28.8c-.5-1.4-.7-2.8-.7-4.3s.3-2.9.7-4.3v-6.1H2.6C.9 17.4 0 20.6 0 24s.9 6.6 2.6 9.9l8.2-5.1z" fill="#FBBC05"/>
                  <path d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.4 30.5 0 24 0 14.7 0 6.5 5.4 2.6 13.2l8.2 5.1C12.7 13.6 17.9 9.5 24 9.5z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

            {/* Login link */}
            <p className="text-center text-[11px]" style={{ color: 'hsl(6 14% 54%)', fontFamily: 'Poppins, sans-serif' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login?role=provider')}
                style={{ color: 'hsl(4 72% 52%)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Log in
              </button>
            </p>
          </form>
        </div>

        {/* Terms */}
        <p className="text-center text-[11px] mt-5" style={{ color: 'hsl(6 14% 54%)', fontFamily: 'Poppins, sans-serif' }}>
          By creating an account you agree to our{' '}
          <a href="https://sites.google.com/view/xitoevents/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(6 14% 54%)', textDecoration: 'underline' }}>
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}
